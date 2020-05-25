const jwt = require('jsonwebtoken');
const jwtKey = require('./config/jwt');
const controller = require('./controller');

const verifyToken = (req, res, next) => {
    const clientToken = req.cookies.user;
    jwt.verify(clientToken, jwtKey.secret, (err) => {
            if (err) {
                controller.auth.RefreshToken(req, res, clientToken => {
                    try {
                        const decoded = jwt.verify(clientToken, jwtKey.secret);
                        if (decoded) {
                            console.log('토큰 재발급 성공!');
                            next();
                        }
                    } catch (err) {
                        res.status(401);
                        throw err;
                    }
                })
            } else {
                console.log('권한이 확인되었습니다.');
                next();
            }
        }
    )
}

exports.verifyToken = verifyToken;