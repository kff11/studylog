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
                id: result[0].id,
                name: result[0].name,
                mento: result[0].mento,
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
            const id = jwt.decode(clientToken, jwtKey.secret).id;
            const name = jwt.decode(clientToken, jwtKey.secret).name;
            const now_date = moment().format('YYYY-MM-DD HH:mm:ss');
            model.diary.addData(req, id, name, now_date, data => {
                return res.send(data);
            })
        },
        get: (req, res) => {
            const clientToken = req.cookies.user;
            const id = jwt.decode(clientToken, jwtKey.secret).id;
            model.diary.getData(id, data => {
                return res.send(data);
            })
        },
        del: (req, res) => {
            model.diary.delData(req, data => {
                // HTTP 상태 코드 중 성공 상태 코드! (200)
                return res.sendStatus(200)
            })
        },
    },

    // 로그인
    user: {
        login: (req, res) => {
            const body = req.body;
            const hash = hashing.enc(body.id, body.password, salt);

            model.user.login(body, hash, result => {
                // 로그인에 성공하면
                if (result[0]) {
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
            const hash = hashing.enc(body.id, body.password, salt);

            model.user.addUser(body, hash, now_date, result => {
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
                    const id = jwt.decode(clientToken, jwtKey.secret).id;

                    // 데이터 베이스에 저장된 RefreshToken과 비교
                    model.token.authRefreshToken(id, refreshToken, result => {
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

    // 프로필
    profile: {
      getProfile: (req, res, callback) => {
          console.log('통과');
          const clientToken = req.cookies.user;
          const id = jwt.decode(clientToken, jwtKey.secret).id;
          model.profile.getData(id, result => {
              callback(result);
          })
      }
    },

}