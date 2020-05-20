const jwt = require('jsonwebtoken');
const jwtKey = require('./config/jwt');

const verifyToken = (req, res, next) => {
    try {
        const clientToken = req.cookies.user;
        const decoded = jwt.verify(clientToken, jwtKey.secret);

        if (decoded) {
            res.locals.userId = decoded.id;
            next()
        }
    } catch (err) {
        throw err;
    }
}

exports.verifyToken = verifyToken;