const express = require('express');
const router = express.Router();
const controller = require('./controller');
const {verifyToken} = require('./authorization');


// 테스트
router.get('/post/get', verifyToken, controller.post.get);
router.post('/post/add', controller.post.add);
router.post('/post/del', controller.post.del);

// 일기장
router.post('/diary/get', verifyToken, controller.diary.get);
router.post('/diary/add', verifyToken, controller.diary.add);
router.post('/diary/del', verifyToken, controller.diary.del);
router.post('/diary/modify', verifyToken, controller.diary.modify)
router.post('/diary/share', verifyToken, controller.diary.share)

// 로그인, 회원가입, 프로필
router.post('/user/add', controller.user.addUser);
router.post('/user/login', controller.user.login);
router.post('/user/update', verifyToken, controller.user.updateProfile);
router.get('/user/get', verifyToken, controller.user.getProfile);

module.exports = router;