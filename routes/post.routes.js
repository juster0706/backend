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
        const { photo_url } = req;
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
        await Posts.create({ userId, nickname, title, content, photo_url, price, location});
        return res.status(200).json({ message: '게시글 작성에 성공하였습니다.' })
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: '게시글 작성에 실패하였습니다.' });
    }
});


router.get('/bestposts', async (req, res) => {
    try {
        const posts = await Posts.find();
        const results = await Promise.all(
            posts.map(async (item) => {
                const post = {
                    postId: item.postId,
                    userId: item.userId,
                    nickname: item.nickname,
                    title: item.title,
                    content: item.content,
                    likes: item.likes,
                    views: item.views,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    photo_url: item.photo_url,
                };
                const likeCount = await Likes.countDocuments({ postId: item.postId });
                post.likeCount = likeCount;
                return post;
            })
        );

        if (results.length === 0) {
            return res.status(412).json({ message: '아직 게시물이 존재하지 않습니다.' });
        }

        let bestPosts;
        if (results.length < 20) {
            bestPosts = results;
        } else {
            const sortedPosts = results.sort((a, b) => b.likeCount - a.likeCount);
            bestPosts = sortedPosts.slice(0, 20);
        }
        
        res.json(bestPosts);
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: '게시글 조회에 실패하였습니다.' });
    }
});


module.exports = router;
