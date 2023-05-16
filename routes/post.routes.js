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

router.get("/:post_id", postController.getPostById);

router.put(
  "/:post_id",
  authMiddleware,
  uploadImage.single("photo"),
  postController.updatePost
);

router.delete("/:post_id", authMiddleware, postController.deletePost);

module.exports = router;
