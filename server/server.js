const express = require('express');
const http = require('http');
const db = require('./config/db');
const app = express();

app.get('/', (req, res) => {
    res.send('소문난 김가네팀')
});

app.get('/api/db', (req, res) => {
    db.query("select * from RDStest", (err, data) => {
        if (!err) {
            res.send(data);

        } else {
            console.log(err);
            res.send(err);
        }
    })
});

http.createServer(app).listen(process.env.PORT || 4000);