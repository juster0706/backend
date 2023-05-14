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
      }
      if (!content) {
        return res
          .status(412)
          .json({ message: "게시글 내용의 형식이 일치하지 않습니다." });
      }
      if (!price) {
        return res
          .status(412)
          .json({ message: "가격의 형식이 일치하지 않습니다." });
      }
      if (!location) {
        return res
          .status(412)
          .json({ message: "장소의 형식이 일치하지 않습니다." });
      }

<<<<<<< HEAD
    createPost = async (req, res) => {
        try {
            const { userId, nickname } = res.locals.user;
            const { title, content, price, location } = req.body;
            const { photo_url } = req;
        
            if (!title) {
                return res.status(412).json({ message: '게시글 제목의 형식이 일치하지 않습니다.' });
            };
            if (!content) {
                return res.status(412).json({ message: '게시글 내용의 형식이 일치하지 않습니다.' });
            };
            if (!price) {
                return res.status(412).json({ message: '가격의 형식이 일치하지 않습니다.' });
            };
            if (!location) {
                return res.status(412).json({ message: '장소의 형식이 일치하지 않습니다.' });
            };
        
            const postData = {
                userId,
                nickname,
                title,
                content,
                photo_url,
                price,
                location,
                current_status: false
            };
            await postService.createPost(postData);
            return res.status(200).json({ message: '게시글 작성에 성공하였습니다.' });

        } catch (err) {
            console.error(err);
            res.status(400).send({ message: "게시글 조회에 실패하였습니다." });
        };
    };
=======
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
    }
  };
>>>>>>> 7be275ad36440619dce1d12253aebfd16c434f73

  getPosts = async (req, res) => {
    try {
      const posts = await postService.getPosts();

      if (posts.error) {
        throw new Error(posts.message);
      }

<<<<<<< HEAD
    getPosts = async (req, res) => {
        try {
            const posts = await postService.getPosts();

            if (posts.error) { 
                throw new Error(posts.message);
            }

            res.json(posts);
        } catch (err) {
            console.error(err);
            res.status(400).send({ message: "게시글 조회에 실패하였습니다." });
        }
    };


=======
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(400).send({ message: "게시글 조회에 실패하였습니다." });
    }
  };
>>>>>>> 7be275ad36440619dce1d12253aebfd16c434f73
}

module.exports = PostController;
