const path = require('path');
const model = require('./model');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const jwtKey = require('./config/jwt');

require('moment-timezone');

// 비밀번호 암호화!
const hashing = require(path.join(__dirname, 'config', 'hashing.js'));
const salt = require(path.join(__dirname, 'config', 'db.json')).salt;

// 액세스 토큰 발급
const clientTokenSign = (result) => {
    return (
        jwt.sign({
                user_id: result.user_id,
                name: result.name,
                mento: result.mento,
            },
            jwtKey.secret, {
                expiresIn: '1h',
            })
    )
}

// 현재 시간 찍기 *회원가입 날짜를 알기 위해! *moment를 사용한 이유는 자바스크립트의 new Data()가 한국 시간이 아니기 때문..
moment.tz.setDefault("Asia/Seoul");

module.exports = {
    // 테스트용
    post: {
        add: (req, res) => {
            model.post.addData(req, data => {
                return res.send(data)
            })
        },
        get: (req, res) => {
            model.post.getData(data => {
                return res.send(data)
            })
        },

        del: (req, res) => {
            model.post.delData(req, data => {
                return res.sendStatus(200)
            })
        },
    },

    // 일기장
    diary: {
        add: (req, res) => {
            const clientToken = req.cookies.user;
            const user_id = jwt.decode(clientToken, jwtKey.secret).user_id;
            const name = jwt.decode(clientToken, jwtKey.secret).name;
            const now_date = moment().format('YYYY-MM-DD HH:mm:ss');
            model.diary.addDiary(req, user_id, name, now_date, data => {
                return res.send(data);
            })
        },
        get: (req, res) => {
            const clientToken = req.cookies.user;
            const user_id = jwt.decode(clientToken, jwtKey.secret).user_id;
            model.diary.getDiary(user_id, req.body.page, req.body.limit, result => {
                return res.send(result);
            })
        },
        del: (req, res) => {
            model.diary.delDiary(req, result => {
                if (result === 1) {
                    return res.send(true);
                } else {
                    return res.send(false);
                }
            })
        },
        modify: (req, res) => {
            model.diary.modifyDiary(req, result => {
                if (result[0] === 1) {
                    return res.send(true);
                } else {
                    return res.send(false);
                }
            })
        },
        share: (req, res) => {
            const now_date = moment().format('YYYY-MM-DD HH:mm:ss');
            model.diary.shareDiary(req, now_date, result => {
                if (result[0] === 1) {
                    return res.send(true);
                } else {
                    return res.send(false);
                }
            })
        },
        cancel: (req, res) => {
            model.diary.cancelShare(req, result => {
                if (result[0] === 1) {
                    return res.send(true);
                } else {
                    return res.send(false);
                }
            })
        }
    },

    // 게시판
    board: {
        getBoard: (req, res) => {
            model.board.getBoard(req.body.page, req.body.limit, result => {
                return res.send(result);
            })
        }
    },

    // 댓글
    comment: {
        getComments: (req, res) => {
            model.comment.getComments(req.body.diary_id, result => {
                return res.send(result);
            })
        },
        addComment: (req, res) => {
            const now_date = moment().format('MM-DD HH:mm');
            const body = req.body;
            model.comment.addComment(body.diary_id, body.user_id, body.user_name, body.contents, now_date, result => {
                return res.send(result);
            })
        },
        delComment: (req, res) => {
            model.comment.delComment(req.body.id, result => {
                return res.send(result);
            })
        }
    },

    // 로그인, 회원가입, 프로필
    user: {
        login: (req, res) => {
            const body = req.body;
            const hash = hashing.enc(body.user_id, body.password, salt);

            model.user.login(body, hash, result => {
                // 로그인에 성공하면
                if (result) {
                    // Access Token 생성
                    const clientToken = clientTokenSign(result);

                    // Refresh Token 생성
                    const refreshToken = jwt.sign({
                        refreshToken: true
                    }, jwtKey.secret, {expiresIn: '1w'});
                    model.token.addRefreshToken(body, refreshToken)

                    // 쿠키에 토큰 할당
                    res.cookie('user', clientToken);
                    res.cookie('userRefreshToken', refreshToken);
                }
                res.send(result);
            })
        },
        addUser: (req, res) => {
            const now_date = moment().format('YYYY-MM-DD HH:mm:ss');
            const body = req.body;
            const hash = hashing.enc(body.user_id, body.password, salt);

            model.user.addUser(body, hash, now_date, result => {
                res.send(result);
            })
        },
        getProfile: (req, res) => {
            const clientToken = req.cookies.user;
            const user_id = jwt.decode(clientToken, jwtKey.secret).user_id;
            model.user.getUser(user_id, result => {
                res.send(result[0]);
            })
        },
        updateProfile: (req, res) => {
            const clientToken = req.cookies.user;
            const user_id = jwt.decode(clientToken, jwtKey.secret).user_id;
            const mento = jwt.decode(clientToken, jwtKey.secret).mento;

            model.user.updateUser(req.body, user_id, result => {
                const profile = {
                    user_id: user_id,
                    name: req.body.name,
                    mento: mento
                }
                const _clientToken = clientTokenSign(profile);
                res.cookie('user', _clientToken);
                res.send(result);
            })
        }

    },

    // 토큰 인증
    auth: {
        RefreshToken: (req, res, callback) => {
            const refreshToken = req.cookies.userRefreshToken;
            jwt.verify(refreshToken, jwtKey.secret, (err) => {
                // RefreshToken의 유효기간이 지나면,
                if (err) {
                    res.cookie('user');
                    res.cookie('userRefreshToken');
                    callback(false);
                } else {
                    // 만료된 AccessToken의 정보를 가져옴
                    let clientToken = req.cookies.user;
                    const user_id = jwt.decode(clientToken, jwtKey.secret).user_id;

                    // 데이터 베이스에 저장된 RefreshToken과 비교
                    model.token.authRefreshToken(user_id, refreshToken, result => {
                        if (result) {
                            // RefreshToken이 확인되면 새로운 AccessToken을 발급
                            clientToken = clientTokenSign(result);
                            res.cookie('user', clientToken);
                            callback(clientToken);
                        }
                    })
                }
            });
        },
    },
}