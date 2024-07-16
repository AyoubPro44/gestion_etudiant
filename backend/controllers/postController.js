const Post = require('../models/postModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../uploads/posts'));
        },
        filename: (req, file, cb) => {
            cb(null, 'post_' + Date.now() + path.extname(file.originalname));
        }
    }),
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
});

class PostController {
    async getPosts(req, res) {
        try {
            const [posts] = await Post.getAllPosts();
            return res.status(200).json({ posts });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async createPost(req, res) {
        const { title, description, id_admin } = req.body;
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'No image uploaded.' });
        }

        try {
            // Decode base64 image data
            const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');

            // Generate filename (if needed)
            const imageName = 'post_' + Date.now() + '.jpg';
            fs.writeFileSync(path.join(__dirname, '../uploads/posts', imageName), buffer);
            const [newPost] = await Post.createPost(id_admin, title, description, imageName);
            return res.status(200).json({ message: "post inserted successfully" });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async updatePost(req, res) {
        const { id_post, title, description, image, isImageEdited } = req.body;

        try {
            let updatedImage = '';
            const prevPost = await Post.getPostById(id_post);
            const isEdited = JSON.parse(isImageEdited)
            if (image && isEdited) {

                const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                const imageName = 'post_' + Date.now() + '.jpg';
                fs.writeFileSync(path.join(__dirname, '../uploads/posts', imageName), buffer);
                updatedImage = imageName;
                if (prevPost && prevPost.photo) {
                    const imagePath = path.join(__dirname, '../uploads/posts', prevPost.photo);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                        console.log(`Deleted old image: ${prevPost.photo}`);
                    }
                }
            }
            else {
                updatedImage = prevPost.PHOTO
            }

            await Post.updatePostById(id_post, title, description, updatedImage);
            return res.status(200).json({ message: "Post updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    uploadMiddleware() {
        return upload.single('image');
    }

    async deletePost(req, res) {
        try {
            const { id_post, image_name } = req.body;

            await Post.deletePostById(id_post);
            const imagePath = path.join(__dirname, '../uploads/posts', image_name);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log(`Deleted image: ${image_name}`);
            } else {
                console.log(`Image ${image_name} not found.`);
            }

            return res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PostController();
