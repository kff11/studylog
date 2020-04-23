const express = require('express');
const http = require('http');
const app = express();

const sequelize = require('./models').sequelize;
sequelize.sync();

app.get('/', (req, res) => {
    res.send('소문난 김가네팀')
});

http.createServer(app).listen(process.env.PORT || 4000);