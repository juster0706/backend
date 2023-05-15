const PostService = require("../services/posts.service");
const postService = new PostService();

class PostController {
  createPost = async (req, res) => {
    try {
      const { userId, nickname } = res.locals.user;
      const { title, content, price, location } = req.body;
      const { photo_url } = req;

      if (!title) {
        return res
          .status(412)
          .json({ message: "게시글 제목의 형식이 일치하지 않습니다." });
      };
      if (!content) {
        return res
          .status(412)
          .json({ message: "게시글 내용의 형식이 일치하지 않습니다." });
      };
      if (!price) {
        return res
          .status(412)
          .json({ message: "가격의 형식이 일치하지 않습니다." });
      };
      if (!location) {
        return res
          .status(412)
          .json({ message: "장소의 형식이 일치하지 않습니다." });
      };

      const postData = {
        userId,
        nickname,
        title,
        content,
        photo_url,
        price,
        location,
        current_status: false,
      };
      await postService.createPost(postData);
      return res.status(200).json({ message: "게시글 작성에 성공하였습니다." });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: "게시글 조회에 실패하였습니다." });
    };
  };

  getPosts = async (req, res) => {
    try {
      const posts = await postService.getPosts();

      if (posts.error) {
        throw new Error(posts.message);
      };

      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: "게시글 조회에 실패하였습니다." });
    };
  };



  getBestPosts = async (req, res) => {
    try {
      const bestPosts = await postsService.getBestPosts();
      res.json(bestPosts);
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: "게시글 조회에 실패하였습니다." });
    };
  };

  getPostById = async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await postsService.getPostById(postId);
      res.json({ data: post });
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: "게시글 조회에 실패하였습니다." });
    };
  };
  
  updatePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, content, price, location } = req.body;
      const { photo_url } = req;
      await postsService.updatePost(userId, postId, title, content, price, location, photo_url);
      res.status(200).json({ message: "게시글을 수정하였습니다." });
    } catch (err) {
      console.error(err);
      res.status(400).send({ errorMessage: "게시글 수정에 실패하였습니다." });
    };
  };
  
  deletePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      await postsService.deletePost(userId, postId);
      res.status(200).json({ message: "게시글을 삭제하였습니다." });
    } catch (err) {
      console.error(err);
      res.status(400).send({ errorMessage: "게시글 삭제에 실패하였습니다." });
    };
  };


}

module.exports = PostController;
