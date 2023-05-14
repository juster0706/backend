const LikesService = require("../services/likes.service");
// const PostsService = require("../services/posts.service");

class LikesController {
  likesService = new LikesService();
  // postsService = new PostsService();

  postLikeToggle = async (req, res) => {
    try {
      const { post_id } = req.params;
      const { user_id } = res.locals.user;
      // 1. post 존재 여부 확인
      // const postExist = await this.postsService.getOnePost(post_id);
      // if (!postExist) {
      //   return res
      //     .status(404)
      //     .json({ errorMessage: "게시글이 존재하지 않습니다." });
      // }
      // 2. like 존재 여부확인
      const likeExist = await this.likesService.getPostLiked(user_id, post_id);

      if (likeExist) {
        const postLikeToggleData = await this.likesService.postLikeToggle(
          user_id,
          post_id,
          true
        );

        return res.status(200).json({ message: "게시글 좋아요 취소 완료" });
      } else {
        const postLikeToggleData = await this.likesService.postLikeToggle(
          user_id,
          post_id,
          false
        );
        return res.status(200).json({ message: "게시글 좋아요 완료" });
      }
    } catch (err) {
      res.status(400).json({
        errorMessage: "게시글 좋아요에 실패하였습니다.",
      });
    }
  };

  commentLikeToggle = async (req, res) => {
    try {
      const { post_id, comment_id } = req.params;
      const { user_id } = res.locals.user;
      // 1. post 존재 여부 확인
      // const postExist = await this.postsService.getOnePost(post_id);
      const commentExist = await this.commentsService.getOneComment(comment_id);
      // 댓글 존재 확인

      // if (!postExist) {
      //   return res
      //     .status(404)
      //     .json({ errorMessage: "게시글이 존재하지 않습니다." });
      // }
      if (!commentExist) {
        return res
          .status(404)
          .json({ errorMessage: "댓글이 존재하지 않습니다." });
      }
      // 2. like 존재 여부확인
      const likeExist = await this.likesService.getCommentLiked(
        user_id,
        comment_id
      );

      if (likeExist) {
        const commentLikeToggleData = await this.likesService.commentLikeToggle(
          user_id,
          comment_id,
          true
        );

        return res.status(200).json({ message: "댓글 좋아요 취소 완료" });
      } else {
        const commentLikeToggleData = await this.likesService.commentLikeToggle(
          user_id,
          comment_id,
          false
        );
        return res.status(200).json({ message: "댓글 좋아요 완료" });
      }
    } catch (err) {
      res.status(400).json({
        errorMessage: "댓글 좋아요에 실패하였습니다.",
      });
    }
  };
}

module.exports = LikesController;
