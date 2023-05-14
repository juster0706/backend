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
  postsController.getBestPosts);



router.get("/posts/:postId", 
  postsController.getPostById);



router.put("/posts/:postId", 
  authMiddleware, 
  uploadImage.single("photo"), 
  postsController.updatePost);



router.delete("/posts/:postId", 
  authMiddleware, 
  postsController.deletePost);

module.exports = router;
