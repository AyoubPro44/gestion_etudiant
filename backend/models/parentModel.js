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
        SELECT e.id_etudiant, u.firstname, u.lastname, e.num_etudiant, e.semestre, f.nom_filiere, e.id_filiere, sp.planning
        FROM users u, etudiant e, filiere f, semestre_planning sp
        WHERE u.ID_USER = e.ID_USER 
        and e.ID_FILIERE = f.ID_FILIERE
        and f.ID_FILIERE = sp.ID_FILIERE
        and e.ID_PARENT = ?
        and e.SEMESTRE = sp.SEMESTRE;
    `, [id_parent])
}

const getParents = () => {
    return db.query(`
        SELECT p.id_parent, u.firstname, u.lastname, u.email, COUNT(e.ID_ETUDIANT) as nb_etudiants
        FROM parent p
        JOIN users u ON u.ID_USER = p.ID_USER
        LEFT JOIN etudiant e ON e.ID_PARENT = p.ID_PARENT
        GROUP BY p.ID_PARENT;
    `)
}

module.exports = { 
    createParent, 
    getParentByUserId, 
    getParentEtudiants,
    getParents
};
