const db = require('../config/db');

const createAdmin = async (id_user) => {
    return db.query('Insert into administrateur (ID_USER) values (?)', [id_user]);
}

const getAdminByUserId = async (userId) => {
    return db.query('select * from administrateur where ID_USER = ?', [userId]);
}

module.exports = { createAdmin, getAdminByUserId };
