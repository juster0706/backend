const PostsService = require("../services/posts.service");
const fs = require("fs");

class ChatController {
  postsService = new PostsService();

  chat = async (req, res) => {
    // const { nickname } = res.locals.user;
    //     const { post_id } = req.params;

    //     const post = await this.postsService.getPostById(post_id);
    //     if (!post) {
    //       console.log("없는 게시글");
    //       res.status(404).json({ message: "게시글이 존재하지 않습니다" });
    //       return;
    //     }

    //     const rommNickname = post.nickname;
    //     try {
    //       const data = fs.readFileSync("./static/index.html");
    //       const resData = {
    //         // nickname: nickname,
    //         post_id,
    //         roomName: rommNickname,
    //       };

    //       res.writeHead(200, { "Content-Type": "text/html" });
    //       res.write(data);
    //       res.write(
    //         `<script>window.resData = ${JSON.stringify(resData)};</script>`
    //       );
    //       res.end();
    //     } catch (err) {
    //       res.send("오류났음");
    //     }
    //   };
    fs.readFile("./static/index.html", (err, data) => {
      if (err) {
        res.send("오류났음");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  };
}

module.exports = ChatController;
