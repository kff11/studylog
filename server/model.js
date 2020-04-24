const sequelize = require('./models').sequelize;

const {
    diary,
    Sequelize: {Op}
} = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
    api: {
        getDB: callback => {
            diary.findAll().then(result => {
                callback(result)
            }).catch(err => {
                throw err
            })
        },
    }

}