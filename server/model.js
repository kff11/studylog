const sequelize = require('./models').sequelize;

const {
    Test,
    User,
    Diary,
    Reply,
    Sequelize: {Op}
} = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
    // 테스트용
    post: {
        addData: (req, callback) => {
            Test.create({
                post: req.body.data
            }).then(result => {
                callback(result)
            }).catch(err => {
                throw err;
            })

        },
        getData: callback => {
            Test.findAll().then(result => {
                callback(result)
            }).catch(err => {
                throw err
            })
        },
        delData: (req, callback) => {
            Test.destroy({
                where: {id: req.body.id}
            }).then(result => {
                callback(result)
            }).catch(err => {
                throw err
            })
        },
    },
    // 일기장
    diary: {
        addDiary: (req, id, name, date, callback) => {
            Diary.create({
                user_id: id,
                user_name: name,
                title: req.body.title,
                contents: req.body.contents,
                date: date,
                isBoard: false,
                board_date: 0,
            }).then(result => {
                callback(result)
            }).catch(err => {
                throw err;
            })
        },
        getDiary: (id, page, limit, callback) => {
            let result = {};
            Diary.count({
                where: {user_id: id}
            }).then(countResult => {
                result['count'] = countResult;

                Diary.findAll({
                    where: {user_id: id},
                    limit: limit,
                    offset: (page - 1) * limit,
                    order: sequelize.literal('id DESC')
                }).then(_result => {
                    result['rows'] = _result
                    callback(result)
                }).catch(err => {
                    throw err
                })
            }).catch(err => {
                throw err
            })
        },
        delDiary: (req, callback) => {
            Diary.destroy({
                where: {id: req.body.id}
            }).then(result => {
                callback(result)
            }).catch(err => {
                throw err
            })
        },
        modifyDiary: (req, callback) => {
            Diary.update({
                title: req.body.title,
                contents: req.body.contents,
            }, {
                where: {id: req.body.id}
            }).then(result => {
                callback(result)
            }).catch(err => {
                throw err;
            })
        },
        shareDiary: (req, date, callback) => {
            Diary.update({
                isBoard: true,
                board_date: date,
            }, {
                where: {id: req.body.id}
            }).then(result => {
                callback(result)
            }).catch(err => {
                throw err;
            })
        },
        cancelShare: (req, callback) => {
            Diary.update({
                isBoard: false,
            }, {
                where: {id: req.body.id}
            }).then(result => {
                callback(result)
            }).catch(err => {
                throw err;
            })
        }
    },
    // 공유 게시판
    board: {
        getBoard: (page, limit, callback) => {
            let result = {};
            Diary.count({
                where: {isBoard: true}
            }).then(countResult => {
                result['count'] = countResult;

                Diary.findAll({
                    where: {isBoard: true},
                    limit: limit,
                    offset: (page - 1) * limit,
                    order: sequelize.literal('board_date DESC')
                }).then(_result => {
                    result['rows'] = _result
                    callback(result)
                }).catch(err => {
                    throw err;
                })
            }).catch(err => {
                throw err;
            })
        },
    },
    // 댓글
    comment: {
        getComments: (diary_id, callback) => {
            Reply.findAll({
                where: {diary_id: diary_id},
            }).then(result => {
                callback(result)
            }).catch(err => {
                throw err;
            })
        },
        addComment: (diary_id, user_id, user_name, contents, date, callback) => {
            Reply.create({
                diary_id: diary_id,
                user_id: user_id,
                user_name: user_name,
                contents: contents,
                date: date,
            }).then(
                callback(true)
            ).catch(err => {
                throw err;
            })
        },
        delComment: (id, callback) => {
            Reply.destroy({
                where: {id: id}
            }).then(
                callback(true)
            ).catch(err => {
                throw err;
            })
        }
    },
    // 로그인 및 프로필
    user: {
        login: (body, hash, callback) => {
            User.findOne({
                where: {user_id: body.user_id, password: hash}
            }).then(result => {
                try {
                    callback(result.dataValues);
                } catch (err) {
                    callback(false);
                }
            }).catch(err => {
                throw err;
            })
        },
        addUser: (body, hash_pw, now, callback) => {
            User.findAll({
                where: {user_id: body.user_id},
            }).then(result => {
                if (result[0]) {
                    callback(false);
                } else {
                    User.create({
                        user_id: body.user_id,
                        password: hash_pw,
                        signUp_date: now,
                        name: body.name,
                        admin: false,
                        mento: false,
                        refreshToken: "none",
                    }).then(callback(true));
                }
            })
        },
        getUser: (user_id, callback) => {
            User.findAll({
                where: {user_id: user_id}
            }).then(result => {
                callback(result);
            }).catch(err => {
                throw err;
            })
        },
        updateUser: (body, user_id, callback) => {
            User.update({
                name: body.name,
                email: body.email,
                phone: body.phone,
                state: body.state,
            }, {where: {user_id: user_id}})
                .then(() => {
                    Diary.update({
                        user_name: body.name,
                    }, {where: {user_id: user_id}})
                        .then(result => {
                            result[0] >= 0 ? callback(true) : callback(false)
                        })
                        .catch(err => {
                            throw err;
                        })
                })
                .catch(err => {
                    throw err;
                })
        }
    },
    // 토큰 인증
    token: {
        addRefreshToken: (body, refreshToken) => {
            User.update({
                refreshToken: refreshToken
            }, {where: {user_id: body.user_id}})
                .catch(err => {
                    throw err;
                })
        },
        authRefreshToken: (user_id, refreshToken, callback) => {
            User.findOne({
                where: {user_id: user_id}
            }).then(result => {
                result.dataValues.refreshToken === refreshToken ? callback(result.dataValues) : callback(false)
            }).catch(err => {
                throw err;
            })
        },
    },

}