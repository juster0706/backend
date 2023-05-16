const { Posts,Likes } = require('../models');
require('dotenv').config();


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



  async getLikeCount(post_id) {
    console.log(post_id)
    return await Likes.count({ post_id: post_id }).catch((err) => {
      throw new Error("좋아요 수 조회에 실패하였습니다.");
    });
  };

  findAllPosts = async () => {
    return await Posts.findAll();
};

  getPostWithCounts = async (item) => {
    const post = {
      post_id: item.post_id,
      user_id: item.user_id,
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
  
    const likeCount = await Likes.count({ post_id: item.post_id });
    post.likeCount = likeCount;
  
    return post;
  };



  findPostById = async (post_id) => {
    const post = await Posts.findOneAndUpdate(
      { _id: post_id },
      { $inc: { views: 1 } },
      { new: true }
    );
    return post;
  };
  

  
  async getLikeCount(post_id) {
    console.log(post_id)
      return await Likes.count({post_id: post_id}).catch((err)=>{
        throw new Error("좋아요 수 조회에 실패하였습니다!")
      })
  }
  


  updatePostById = async (post_id, title, content, price, location, photo_url) => {
    const date = new Date();
    await Posts.updateOne(
      { _id: post_id },
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
  
  deletePostById = async (post_id) => {
    await Posts.deleteOne({ _id: post_id });
  };
  
};

module.exports = PostRepository;
