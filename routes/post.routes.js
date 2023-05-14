const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const PostController = require("../controllers/posts.controller");
const postController = new PostController();
const uploadImage = require("../modules/s3.js");

router.post(
  "/posts",
  authMiddleware,
  uploadImage.single("photo"),
  async (req, res) => {
    postController.createPost(req, res);
  }
);



router.get("/posts", async (req, res) => {
  postController.getPosts(req, res);
});



router.get("/bestposts", 
  postController.getBestPosts);



router.get("/posts/:postId", 
  postController.getPostById);



router.put("/posts/:postId", 
  authMiddleware, 
  uploadImage.single("photo"), 
  postController.updatePost);



router.delete("/posts/:postId", 
  authMiddleware, 
  postController.deletePost);

module.exports = router;
