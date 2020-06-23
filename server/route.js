const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const controller = require('./controller');
const {verifyToken} = require('./authorization');

const upload = multer({
        dest: 'public/images/'
    }
)

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
router.post('/diary/cancel', verifyToken, controller.diary.cancel)

// 게시판
router.post('/board/get', verifyToken, controller.board.getBoard);

// 댓글
router.post('/comment/get', verifyToken, controller.comment.getComments);
router.post('/comment/add', verifyToken, controller.comment.addComment);
router.post('/comment/del', verifyToken, controller.comment.delComment);

// 로그인, 회원가입, 프로필
router.post('/user/add', controller.user.addUser);
router.post('/user/login', controller.user.login);
router.post('/user/update', verifyToken, controller.user.updateProfile);
router.post('/user/addImg', verifyToken, upload.single('img'), controller.user.updateImage);
router.get('/user/delImg', verifyToken, controller.user.delImage);
router.get('/user/get', verifyToken, controller.user.getProfile);

module.exports = router;