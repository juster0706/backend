const { Posts } = require('../models');

class PostRepository {


  async create(postData) {
    return await Posts.create(postData);
  };

  async getPosts() {
    return await Posts.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
    });
}



  async getLikeCount(postId) {
    return await Likes.countDocuments({ postId: postId }).catch((err) => {
      throw new Error("좋아요 수 조회에 실패하였습니다.");
    });
  };

  findAllPosts = async () => {
    return await Posts.findAll();
};

  getPostWithCounts = async (item) => {
    const post = {
      postId: item.postId,
      userId: item.userId,
      nickname: item.nickname,
      title: item.title,
      content: item.content,
      likes: item.likes,
      views: item.views,
      price: item.price,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      photo_url: item.photo_url,
      current_status: item.current_status,
    };
  
    const likeCount = await Likes.countDocuments({ postId: item.postId });
    post.likeCount = likeCount;
  
    return post;
  };



  findPostById = async (postId) => {
    const post = await Posts.findOneAndUpdate(
      { _id: postId },
      { $inc: { views: 1 } },
      { new: true }
    );
    return post;
  };
  
  getLikeCount = async (postId) => {
    return await Likes.countDocuments({ postId: postId });
  };
  
  updatePostById = async (postId, title, content, price, location, photo_url) => {
    const date = new Date();
    await Posts.updateOne(
      { _id: postId },
      {
        $set: {
          title: title,
          content: content,
          updatedAt: date,
          photo_url: photo_url,
          price: price,
          location: location,
        },
      }
    );
  };
  
  deletePostById = async (postId) => {
    await Posts.deleteOne({ _id: postId });
  };
  
};

module.exports = PostRepository;
