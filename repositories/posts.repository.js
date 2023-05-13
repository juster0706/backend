const Posts = require('../models/posts.js');

class PostRepository {
    async create(postData) {
        return await Posts.create(postData);
    }
}

module.exports = PostRepository;