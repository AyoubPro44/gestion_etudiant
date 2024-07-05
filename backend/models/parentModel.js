const db = require('../config/db');

const createParent = async (numEtudiant, id_user) => {
    const result = await db.query('Insert into parent (ID_USER) values (?)', [id_user]);
    db.query('update etudiant set ID_PARENT = ? where NUM_ETUDIANT = ?', [result[0].insertId, numEtudiant])
}

const getParentByUserId = async (userId) => {
    return db.query('select * from parent where ID_USER = ?', [userId]);
}

module.exports = { createParent, getParentByUserId };
