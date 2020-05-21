const path = require('path');
const model = require('./model');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const jwtKey = require('./config/jwt');

require('moment-timezone');

// 비밀번호 암호화!
const hashing = require(path.join(__dirname, 'config', 'hashing.js'));
const salt = require(path.join(__dirname, 'config', 'db.json')).salt;

// 현재 시간 찍기 *회원가입 날짜를 알기 위해! *moment를 사용한 이유는 자바스크립트의 new Data()가 한국 시간이 아니기 때문..
moment.tz.setDefault("Asia/Seoul");

module.exports = {
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


    user: {
        login: (req, res) => {
            const body = req.body;
            const hash = hashing.enc(body.id, body.password, salt);

            model.user.login(body, hash, result => {
                if(result[0]){
                    // JWT 토큰 생성
                    const token = jwt.sign({
                            id: body.id,
                            name: result[0].name
                        },
                        jwtKey.secret,{
                            expiresIn: '1h'
                        })
                    res.cookie('user', token );
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
    }

}