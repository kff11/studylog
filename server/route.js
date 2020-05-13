const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/post/get', controller.post.get);

router.post('/post/add', controller.post.add);
router.post('/post/del', controller.post.del);
router.post('/user/add', controller.user.addUser);
router.post('/user/login', controller.user.login);

module.exports = router;