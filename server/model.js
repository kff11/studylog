const sequelize = require('./models').sequelize;

const {
    Test,
    User,
    Sequelize: {Op}
} = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
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
            Test.destroy({
                where: {id: req.body.delete.id}
            }).then(result => {
                callback(result)
            }).catch(err => {
                throw err
            })
        },
    },

    user: {
        login: (body, hash, callback) => {
            User.findAll({
                where: {[Op.and]: [{id: body.id, password: hash}]}
            }).then(data => {
                callback(data)
            }).catch(err => {
                throw err;
            })
        },
        addUser: (body, hash_pw, now, callback) => {
            User.count({
                where: {id: body.id},
            }).then(cnt => {
                if (cnt > 0) {
                    callback(false);
                } else {
                    User.create({
                        id: body.id,
                        password: hash_pw,
                        signUp_date: now,
                        name: body.name,
                        admin: false,
                    }).then(() => callback(true));
                }
            })
        }
    }

}