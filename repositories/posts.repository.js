const { Posts, Likes } = require('../models');
require('dotenv').config();

const db = require('../models/index.js'); // MySQL 데이터베이스 연결 객체

class PostRepository {
  async create(postData) {
    const query = `INSERT INTO posts (title, content) VALUES ('${postData.title}', '${postData.content}')`;
    await db.sequelize.query(query);
  }

  async getPosts() {
    const query = 'SELECT * FROM posts ORDER BY created_at DESC';
    const result = await db.sequelize.query(query);
    return result[0];
  }

  async getLikeCount(post_id) {
    const query = `SELECT COUNT(*) AS count FROM likes WHERE post_id = '${post_id}'`;
    const result = await db.sequelize.query(query);
    const count = result[0][0].count;
    return count;
  }

  async findAllPosts() {
    const query = 'SELECT * FROM posts';
    const result = await db.sequelize.query(query);
    return result[0];
  }

  async getPostWithCounts(item) {
    const query = `
      SELECT p.*, COUNT(l.post_id) AS likeCount
      FROM posts p
      LEFT JOIN likes l ON p.post_id = l.post_id
      WHERE p.post_id = '${item.post_id}'
      GROUP BY p.post_id
    `;
    const result = await db.sequelize.query(query);
    const post = result[0][0];
    return post;
  }

  async findPostById(post_id) {
    const query = `SELECT * FROM posts WHERE post_id = '${post_id}'`;
    const result = await db.sequelize.query(query);
    const post = result[0][0];
    await db.sequelize.query(`UPDATE posts SET views = views + 1 WHERE post_id = '${post_id}'`);
    return post;
  }

  async updatePostById(post_id, title, content, price, location, photo_url) {
    const query = `
      UPDATE posts
      SET title = '${title}', content = '${content}', price = '${price}',
      location = '${location}', photo_url = '${photo_url}', updated_at = NOW()
      WHERE post_id = '${post_id}'
    `;
    await db.sequelize.query(query);
  }

  async deletePostById(post_id) {
    await db.sequelize.query(`DELETE FROM posts WHERE post_id = '${post_id}'`);
  }
}

module.exports = PostRepository;