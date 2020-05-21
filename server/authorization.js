const jwt = require('jsonwebtoken');
const jwtKey = require('./config/jwt');

const verifyToken = (req, res, next) => {
    try {
        const clientToken = req.cookies.user;
        const decoded = jwt.verify(clientToken, jwtKey.secret);

        if (decoded) {
            res.locals.userId = decoded.id;
            console.log('권한이 확인되었습니다.');
            next()
        } else {
            res.status(401).json({error: 'unauthorized'});
        }
    } catch (err) {
        throw err;
    }
}

exports.verifyToken = verifyToken;