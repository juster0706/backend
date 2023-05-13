const { Comments } = require("../models");

class CommentRepository {
  createComment = async (post_id, user_id, nickname, comment) => {
    const createComment = await Comments.create({
      post_id,
      user_id,
      nickname,
      comment,
    });
    return createComment;
  };

  getComments = async (post_id) => {
    const comments = await Comments.findAll({
      where: {
        post_id,
      },
      attributes: [
        "comment_id",
        "user_id",
        "nickname",
        "comment",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
    });
    return comments;
  };

  putComment = async (comment, comment_id, post_id, user_id) => {
    const putComment = await Comments.update(
      { comment },
      {
        where: { comment_id, post_id, user_id },
      }
    );
    return putComment;
  };

  deleteComment = async (comment_id, post_id, user_id) => {
    const deleteComment = await Comments.destroy({
      where: { comment_id, post_id, user_id },
    });
    return deleteComment;
  };

  findOneComment = async (comment_id) => {
    const comment = await Comments.findOne({
      where: { comment_id },
      attributes: [
        "comment_id",
        "post_id",
        "user_id",
        "createdAt",
        "updatedAt",
      ],
    });
    return comment;
  };
}

module.exports = CommentRepository;
