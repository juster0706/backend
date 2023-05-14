const { Likes, Posts, Comments } = require("../models/index");
const LikesRepository = require("../repositories/likes.repository");
// const PostsRepository = require("../repositories/posts.repository");
const CommentsRepository = require("../repositories/comments.repository");
const { sequelize } = require("../models");
const { Transaction } = require("sequelize");

class LikesService {
  likesRepository = new LikesRepository(Likes);
  // postsRepository = new PostsRepository(Posts);
  commentsRepository = new CommentsRepository(Comments);

  getPostLiked = async (user_id, post_id) => {
    const getPostLikedData = await this.likesRepository.getPostLiked(
      user_id,
      post_id
    );
    return getPostLikedData;
  };

  getCommentLiked = async (user_id, comment_id) => {
    const getCommentLikedData = await this.likesRepository.getCommentLiked(
      user_id,
      comment_id
    );
    return getCommentLikedData;
  };

  postLikeToggle = async (user_id, post_id, likeExist) => {
    await sequelize.transaction(
      { isolateLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (t) => {
        if (likeExist) {
          // 2-1. 존재하면 삭제 및 decrease
          const deleteLikeData = await this.likesRepository.postDeleteLike(
            user_id,
            post_id
          );

          const decreaseLikeData = await this.likesRepository.postDecreaseLikes(
            post_id
          );

          return { message: "댓글 좋아요 취소 완료" };
        } else {
          // 2-2. 존재하지 않으면 생성 및 increase
          const createLikeData = await this.likesRepository.createLike(
            user_id,
            post_id
          );

          const increaseLikesData =
            await this.likesRepository.postIncreaseLikes(post_id);

          return { message: "댓글 좋아요 완료" };
        }
      }
    );
  };

  commentLikeToggle = async (user_id, comment_id, likeExist) => {
    await sequelize.transaction(
      { isolateLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED },
      async (t) => {
        if (likeExist) {
          // 2-1. 존재하면 삭제 및 decrease
          const deleteLikeData = await this.likesRepository.commentDeleteLike(
            user_id,
            comment_id
          );

          const decreaseLikeData =
            await this.likesRepository.commentDecreaseLikes(comment_id);

          return { message: "월드컵 취소 좋아요 완료" };
        } else {
          // 2-2. 존재하지 않으면 생성 및 increase
          const createLikeData = await this.likesRepository.createLike(
            user_id,
            post_id,
            comment_id
          );

          const increaseLikesData =
            await this.likesRepository.commentIncreaseLikes(comment_id);

          return { message: "월드컵 좋아요 완료" };
        }
      }
    );
  };
}
module.exports = LikesService;
