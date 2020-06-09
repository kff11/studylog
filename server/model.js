const sequelize = require('./models').sequelize;

const {
    Test,
    User,
    Diary,
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
                console.log(err)
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
            console.log(req.body.id);
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
        addData: (req, id, name, date, callback) => {
            Diary.create({
                user_id: id,
                user_name: name,
                title: req.body.title,
                contents: req.body.contents,
                date: date,
            }).then(result => {
                callback(result)
            }).catch(err => {
                console.log(err)
                throw err;
            })
        },
        getData: (id, callback) => {
            Diary.findAll({
                where: {[Op.and]: [{user_id: id}]}
            }).then(result => {
                callback(result)
            }).catch(err => {
                throw err
            })
        },
        delData: (req, callback) => {
            Diary.destroy({
                where: {id: req.body.id}
            }).then(result => {
                callback(result)
            }).catch(err => {
                throw err
            })
        },
    },
    // 로그인
    user: {
        login: (body, hash, callback) => {
            User.findAll({
                where: {[Op.and]: [{id: body.id, password: hash}]}
            }).then(result => {
                if (result[0]) {
                    callback(result);
                } else {
                    callback(false);
                }

            }).catch(err => {
                throw err;
            })
        },
        addUser: (body, hash_pw, now, callback) => {
            User.findAll({
                where: {id: body.id},
            }).then(result => {
                if (result[0]) {
                    callback(false);
                } else {
                    User.create({
                        id: body.id,
                        password: hash_pw,
                        signUp_date: now,
                        name: body.name,
                        admin: false,
                        mento: false,
                        refreshToken: "none",
                    }).then(() => callback(true));
                }
            })
        },
    },
    // 토큰 인증
    token: {
        addRefreshToken: (body, refreshToken) => {
            User.update({
                refreshToken: refreshToken
            }, {where: {id: body.id}})
                .catch(err => {
                    throw err;
                })
        },
        authRefreshToken: (id, refreshToken, callback) => {
            User.findAll({
                where: {id: id}
            }).then(result => {
                result[0].refreshToken === refreshToken ? callback(result) : callback(false)
            }).catch(err => {
                throw err;
            })
        },
    },
    profile: {
        getData: (id, callback) => {
            User.findAll({
                where: {id: id}
            }).then(result => {
                callback(result);
            }).catch(err => {
                throw err;
            })
        },
    },

}