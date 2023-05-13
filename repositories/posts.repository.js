const Posts = require('../models/posts.js');

class PostRepository {
    async create(postData) {
        console.log("postData:", postData)
        return await Posts.create(postData);
    }
}

module.exports = PostRepository;