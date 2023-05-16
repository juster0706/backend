const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();
const authMiddleware = require("../middlewares/auth-middleware");

router.post(
  "/:post_id/comments",
  authMiddleware,
  commentsController.createComment
);
router.get("/:post_id/comments", commentsController.getComments);

router.put(
  "/:post_id/comments/:comment_id",
  authMiddleware,
  commentsController.putComment
);
router.delete(
  "/:post_id/comments/:comment_id",
  authMiddleware,
  commentsController.deleteComment
);

module.exports = router;
