const path = require('path');
const model = require('./model');

module.exports = {
    api: {
        getDB: (req, res) => {
            model.api.getDB( data => {
                return res.send(data)
            })
        },
    }

}