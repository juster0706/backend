const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const Posts = require('../models/posts.js');
const Likes = require('../models/likes.js');
const PostController = require("../controllers/posts.controller");
const postController = new PostController();
const uploadImage = require('../modules/s3.js');


router.post('/posts', authMiddleware, uploadImage.single('photo'), async (req, res) => {
    try {
        const { userId, nickname } = res.locals.user;
        const { title, content, price, location } = req.body;
        const { photo_ip } = req;
        if (!title) {
            return res.status(412).json({ message: '게시글 제목의 형식이 일치하지 않습니다.' })
        }
        if (!content) {
            return res.status(412).json({ message: '게시글 내용의 형식이 일치하지 않습니다.' })
        }
        if (!price) {
            return res.status(412).json({ message: '가격의 형식이 일치하지 않습니다.' })
        }
        if (!location) {
            return res.status(412).json({ message: '장소의 형식이 일치하지 않습니다.' })
        }
        await Posts.create({ userId, nickname, title, content, photo_ip, price, location});
        return res.status(200).json({ message: '게시글 작성에 성공하였습니다.' })
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: '게시글 작성에 실패하였습니다.' });
    }
});



module.exports = router;
