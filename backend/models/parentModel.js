const db = require('../config/db');

const createParent = async (numEtudiant, id_user) => {
    const result = await db.query('Insert into parent (ID_USER) values (?)', [id_user]);
    db.query('update etudiant set ID_PARENT = ? where NUM_ETUDIANT = ?', [result[0].insertId, numEtudiant])
}

const getParentByUserId = async (userId) => {
    return db.query('select * from parent where ID_USER = ?', [userId]);
}

const getParentEtudiants = async (id_parent) => {
    return db.query(`
        SELECT e.id_etudiant, u.firstname, u.lastname, e.num_etudiant, e.semestre, f.nom_filiere
        FROM users u, etudiant e, filiere f
        WHERE u.ID_USER = e.ID_USER 
        and e.ID_FILIERE = f.ID_FILIERE
        and e.ID_PARENT = ?;
    `, [id_parent])
}

module.exports = { createParent, getParentByUserId, getParentEtudiants };
