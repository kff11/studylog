const express = require('express');
const http = require('http');
const router = require('./route');
const sequelize = require('./models').sequelize;

const app = express();

sequelize.sync();

app.use('/', router);


http.createServer(app).listen(process.env.PORT || 4000);