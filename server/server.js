const express = require('express');
const http = require('http');
const https = require('https');
const path = require('path');
const router = require('./route');
const fs = require('fs');
const sequelize = require('./models').sequelize;

const app = express();

sequelize.sync();

app.use(express.json());
app.use('/', router);
app.use('/', require('redirect-https')());

if (process.env.NODE_ENV === 'production') {
    const options = {
        key: fs.readFileSync('/etc/letsencrypt/live/studylog.shop/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/studylog.shop/cert.pem')
    }
    app.use(express.static(path.join(__dirname, '..', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
    });
    http.createServer(app).listen(process.env.PORT);
    https.createServer(options, app).listen(process.env.SSL_PORT);
} else {
    http.createServer(app).listen(4000);
}