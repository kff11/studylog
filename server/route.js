const express = require('express');
const router = express.Router();
const controller = require('./controller');

// 여기서 API 주소를 관리할 수 있다!
router.get('/get/db', controller.api.getDB);

module.exports = router;