const { Posts, Comments, Likes } = require("../models");
const { Op } = require("sequelize");

class LikesRepository {
  getPostLiked = async (user_id, post_id) => {
    const getPostLikedData = await Likes.findOne({
      where: {
        post_id,
        user_id,
      },
    });
    return getPostLikedData;
  };

  getCommentLiked = async (user_id, comment_id) => {
    const getCommentLikedData = await Likes.findOne({
      where: {
        [Op.and]: [{ comment_id }, { user_id }],
      },
    });
    return getCommentLikedData;
  };

  postDeleteLike = async (user_id, post_id) => {
    const deleteLikeData = await Likes.destroy({
      where: { [Op.and]: [{ user_id }, { post_id }] },
    });
    return deleteLikeData;
  };

  commentDeleteLike = async (user_id, comment_id) => {
    const deleteLikeData = await Likes.destroy({
      where: { [Op.and]: [{ user_id }, { comment_id }] },
    });
    return deleteLikeData;
  };

  createPostLike = async (user_id, post_id) => {
    console.log("라잌레포", user_id, post_id);
    const createLikeData = await Likes.create({
      user_id,
      post_id,
    });
    return createLikeData;
  };

  postDecreaseLikes = async (post_id) => {
    const findLikesData = await Posts.findOne({
      where: { post_id },
    });

    const decreaseLikesData = await findLikesData.decrement("likes", { by: 1 });
    return decreaseLikesData;
  };

  postIncreaseLikes = async (post_id) => {
    const findLikesData = await Posts.findOne({
      where: { post_id },
    });

    const increaseLikesData = await findLikesData.increment("likes", { by: 1 });
    return increaseLikesData;
  };

  createCommentLike = async (user_id, post_id, comment_id) => {
    console.log("라잌레포", user_id, post_id, comment_id);
    const createLikeData = await Likes.create({
      user_id,
      post_id,
      comment_id,
    });
    return createLikeData;
  };

  commentDecreaseLikes = async (comment_id) => {
    const findLikesData = await Comments.findOne({
      where: { comment_id },
    });

    const decreaseLikesData = await findLikesData.decrement("likes", { by: 1 });
    return decreaseLikesData;
  };

  commentIncreaseLikes = async (comment_id) => {
    const findLikesData = await Comments.findOne({
      where: { comment_id },
    });

    const increaseLikesData = await findLikesData.increment("likes", { by: 1 });
    return increaseLikesData;
  };
}

module.exports = LikesRepository;
