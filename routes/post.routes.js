const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const PostController = require("../controllers/posts.controller");
const postController = new PostController();
const uploadImage = require("../modules/s3.js");

router.post(
  "/",
  authMiddleware,
  uploadImage.single("photo"),
  async (req, res) => {
    postController.createPost(req, res);
  }
);

router.get("/", async (req, res) => {
  postController.getPosts(req, res);
});

router.get("/best", postController.getBestPosts);

router.get("/:postId", postController.getPostById);

router.put(
  "/:postId",
  authMiddleware,
  uploadImage.single("photo"),
  postController.updatePost
);

router.delete("/:postId", authMiddleware, postController.deletePost);

module.exports = router;
