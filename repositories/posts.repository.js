const Posts = require("../models/posts.js");

class PostRepository {
  async create(postData) {
    return await Posts.create(postData);
  }

  async getPosts() {
    return await Posts.find().sort("-createdAt");
  }

  async getLikeCount(postId) {
    return await Likes.countDocuments({ postId: postId }).catch((err) => {
      throw new Error("좋아요 수 조회에 실패하였습니다.");
    });
  }
}

module.exports = PostRepository;
