const CommentRepository = require("../repositories/comments.repository");
const { Comments } = require("../models");

class CommentService {
  commentRepository = new CommentRepository(Comments);

  createComment = async (post_id, user_id, nickname, comment) => {
    await this.commentRepository.createComment(
      post_id,
      user_id,
      nickname,
      comment
    );
    return { message: "댓글 작성에 성공하였습니다." };
  };

  getComments = async (post_id) => {
    const comments = await this.commentRepository.getComments(post_id);
    return comments.map((a) => {
      return {
        commentId: a.comment_id,
        userId: a.user_id,
        nickname: a.nickname,
        comment: a.comment,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      };
    });
  };

  putComment = async (comment, comment_id, post_id, user_id) => {
    await this.commentRepository.putComment(
      comment,
      comment_id,
      post_id,
      user_id
    );
    return { message: "댓글을 수정하였습니다." };
  };

  deleteComment = async (comment_id, post_id, user_id) => {
    await this.commentRepository.deleteComment(comment_id, post_id, user_id);
    return { message: "게시글을 삭제하였습니다." };
  };

  findOneComment = async (comment_id) => {
    const comment = await this.commentRepository.findOneComment(comment_id);
    if (comment) {
      return {
        comment_id: comment.comment_id,
        post_id: comment.post_id,
        user_id: comment.user_id,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    }
  };
}

module.exports = CommentService;
