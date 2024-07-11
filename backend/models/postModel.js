const db = require('../config/db');

const getAllPosts = async () => {
    return db.query(`SELECT ID_POST, ID_ADMINISTRATEUR, TITLE, PHOTO, DESCRIPTION, DATE_FORMAT(DATE_POST, '%Y-%m-%d') AS DATE_POST FROM post order by date_post desc`);
}

module.exports = { 
    getAllPosts
};