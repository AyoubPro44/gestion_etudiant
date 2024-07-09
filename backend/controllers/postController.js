const Post = require('../models/postModel');

class PostController {
    async getPosts(req, res) {
        try {
            const [posts] = await Post.getAllPosts();
            return res.status(200).json({ posts: posts});
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new PostController();
