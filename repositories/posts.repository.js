const Posts = require("../models/posts.js");

class PostRepository {
<<<<<<< HEAD
    async create(postData) {
        return await Posts.create(postData);
    };


    async getPosts() {
        return await Posts.find().sort("-createdAt");
    };



    async getLikeCount(postId) {
        return await Likes.countDocuments({ postId: postId }).catch((err) => {
            throw new Error('좋아요 수 조회에 실패하였습니다.');
        });
    };
=======
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
>>>>>>> 7be275ad36440619dce1d12253aebfd16c434f73
}

module.exports = PostRepository;
