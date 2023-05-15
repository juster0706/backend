const PostRepository = require("../repositories/posts.repository");
const postRepository = new PostRepository();

class PostService {



  async createPost(postData) {
    console.log("postData:", postData);
    return await postRepository.create(postData);
  };



  async getPosts() {
    try {
      const posts = await postRepository.getPosts();
      const results = await Promise.all(
        posts.map(async (item) => {
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
          const likeCount = await postRepository.getLikeCount(item.postId);
          post.likeCount = likeCount;
          return post;
        })
      );
      return results;
    } catch (error) {
      return { error: true, message: error.message };
    };
  };


  
  getBestPosts = async () => {
    const posts = await postRepository.findAllPosts();
    const results = await Promise.all(
      posts.map(async (item) => {
        return await postRepository.getPostWithCounts(item);
      })
    );

    if (results.length === 0) {
      throw new Error("아직 게시물이 존재하지 않습니다.");
    };

    let bestPosts;
    if (results.length < 20) {
      bestPosts = results;
    } else {
      const sortedPosts = results.sort((a, b) => b.likeCount - a.likeCount);
      bestPosts = sortedPosts.slice(0, 20);
    };

    return bestPosts;
  };



  getPostById = async (postId) => {
    const post = await postsRepository.findPostById(postId);
    const likeCount = await postsRepository.getLikeCount(postId);
    post.likeCount = likeCount;
    return post;
  };



  updatePost = async (userId, postId, title, content, price, location, photo_url) => {
    const post = await postsRepository.findPostById(postId);

    if (!title || !content || !price || !location) {
      throw new Error("입력 값이 유효하지 않습니다.");
    };

    if (userId !== post.userId) {
      throw new Error("게시글 수정 권한이 없습니다.");
    };

    await postsRepository.updatePostById(postId, title, content, price, location, photo_url);
  };



  deletePost = async (userId, postId) => {
    const post = await postsRepository.findPostById(postId);
  
    if (!post) {
      throw new Error("게시글이 존재하지 않습니다.");
    };
  
    if (userId !== post.userId) {
      throw new Error("게시글 삭제 권한이 없습니다.");
    };
  
    await postsRepository.deletePostById(postId);
  };
};

module.exports = PostService;
