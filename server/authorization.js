const jwt = require('jsonwebtoken');
const jwtKey = require('./config/jwt');
const controller = require('./controller');
const model = require('./model');

const verifyToken = (req, res, next) => {
    const clientToken = req.cookies.user;

    jwt.verify(clientToken, jwtKey.secret, (err, decoded) => {
        if (err) {
            controller.auth.RefreshToken(req, res);
            try {
                const clientToken = req.cookies.user;
                const decoded = jwt.verify(clientToken, jwtKey.secret);
                if (decoded) {
                    console.log('토큰 바꿈');
                    next();
                }
            } catch (err) {
                res.status(401);
            }
        } else {
            console.log('권한이 확인되었습니다.');
            next();
        }
    })


    /*try {
        const decoded = jwt.verify(clientToken, jwtKey.secret);
        if (decoded) {
            console.log('권한이 확인되었습니다.');
            next()
        }
    } catch (err) {
        res.status(401).json({error: 'unauthorized'});
        const id = jwt.decode(clientToken, jwtKey.secret).id;
        const name = jwt.decode(clientToken, jwtKey.secret).name;

        const decoded = jwt.verify(refreshToken, jwtKey.secret);
        if (decoded) {
            model.user.authRefreshToken(id, refreshToken, result => {
                if (result) {
                    const accessToken = jwt.sign({
                            id: id,
                            name: name
                        },
                        jwtKey.secret, {
                            expiresIn: '1m'
                        });
                    res.cookie('user', '');
                    next();
                }
            })
        }
        throw err;
    } */
}

exports.verifyToken = verifyToken;