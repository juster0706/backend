const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middlewares/auth-middleware");

const PostController = require("../controllers/posts.controller");
const postController = new PostController();

module.exports = router;
