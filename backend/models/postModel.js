const db = require('../config/db');

const getAllPosts = async () => {
    return db.query(`SELECT ID_POST, ID_ADMINISTRATEUR, TITLE, PHOTO, DESCRIPTION, DATE_FORMAT(DATE_POST, '%Y-%m-%d') AS DATE_POSTED FROM post order by date_post desc`);
}

const createPost = async (id_admin, title, description, image) => {
    return db.query(
        "INSERT INTO post (id_administrateur, title, photo, description, date_post) VALUES (?, ?, ?, ?, NOW())",
        [id_admin, title, image, description]
    );
};

const deletePostById = async (id_post) => {
    return db.query("DELETE FROM post WHERE id_post = ?", [id_post]);
}

const updatePostById = async (id_post, title, description, image) => {
    return db.query(
        "UPDATE post SET title = ?, description = ?, photo = ? WHERE id_post = ?",
        [title, description, image, id_post]
    );
};

const getPostById = async (id_post) => {
    const [rows] = await db.query("SELECT * FROM post WHERE id_post = ?", [id_post]);
    return rows[0];
};


module.exports = {
    getAllPosts,
    createPost,
    deletePostById,
    updatePostById,
    getPostById
};