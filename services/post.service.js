const PostRepository = require("../repositories/post.repository");
const postRepository = new PostRepository();

class PostService {
    async createPost(postData) {
        console.log("postData:", postData);
        return await postRepository.create(postData);
    }
}

module.exports = PostService;
