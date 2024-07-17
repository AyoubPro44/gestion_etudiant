const db = require('../config/db');

const createProfesseur = async (numBureau, id_user, sousModules) => {
    const result = await db.query('Insert into professeur (ID_USER, NUM_BUREAU) values (?, ?)', [id_user, numBureau]);
    for (let i = 0; i < sousModules.length; i++) {
        db.query('Insert into enseigne (ID_PROFESSEUR, ID_SOUS_MODULE) values (?, ?)', [result[0].insertId, sousModules[i]]);
    }
}

const getProfByUserId = async (userId) => {
    return db.query('select * from professeur where ID_USER = ?', [userId]);
}

const getProfCourses = async (profId) => {
    return db.query(`SELECT sm.id_sous_module, nom_sous_module, nom_module, nom_filiere, f.id_filiere, m.semestre, COUNT(et.id_etudiant) AS nb_etudiant
                    FROM enseigne e
                    JOIN sous_module sm ON e.ID_SOUS_MODULE = sm.ID_SOUS_MODULE 
                    JOIN module m ON sm.ID_MODULE = m.ID_MODULE 
                    JOIN filiere f ON m.ID_FILIERE = f.ID_FILIERE 
                    LEFT JOIN etudiant et ON et.ID_FILIERE = f.ID_FILIERE AND m.SEMESTRE = et.SEMESTRE
                    WHERE e.ID_PROFESSEUR = ?
                    GROUP BY sm.id_sous_module, nom_sous_module, nom_module, nom_filiere, f.id_filiere, m.semestre;`
        , [profId]);
}

const updateInfos = async (id_prof, num_bureau) => {
    return db.query(`UPDATE professeur SET num_bureau = ?
                    WHERE id_professeur = ?                
                    `, [num_bureau, id_prof]);
}

const isProfEnseignModule = async (id_prof, id_sous_module) => {
    return db.query(`SELECT * FROM enseigne 
                    WHERE id_professeur = ? and id_sous_module = ?`, [id_prof, id_sous_module]);
}

const removeEnsignement = async (id_prof, id_sous_module) => {
    return db.query(`DELETE FROM enseigne WHERE id_professeur = ? and id_sous_module = ?`
    [id_prof, id_sous_module])
}

const addEnseignement = async (id_prof, id_sous_module) => {
    return db.query(`INSERT INTO enseigne (id_professeur, id_sous_module) VALUES (?, ?)`,
        [id_prof, id_sous_module])
}

const removeProfEnseignements = async (id_prof) => {
    return db.query(`DELETE FROM enseigne WHERE id_professeur = ?`, [id_prof])
}

const getProfEnseignements = async (id_prof) => {
    return db.query(`SELECT id_sous_module FROM enseigne WHERE id_professeur = ?`, [id_prof]);
}

const getAllProfs = () => {
    return db.query(`
        SELECT p.id_professeur, firstname, lastname, num_bureau, planning, COUNT(e.ID_SOUS_MODULE) as nb_sous_modules
        FROM users u, professeur p, enseigne e
        WHERE u.ID_USER = p.ID_USER
        and e.ID_PROFESSEUR = p.ID_PROFESSEUR
        GROUP BY p.ID_PROFESSEUR;
    `)
}

const updateProfPlanning = (planning, id_prof) => {
    return db.query(`
        UPDATE professeur SET planning = ? WHERE id_professeur = ?
        `, [planning, id_prof]);
}

module.exports = {
    createProfesseur,
    getProfByUserId,
    getProfCourses,
    updateInfos,
    isProfEnseignModule,
    removeEnsignement,
    addEnseignement,
    removeProfEnseignements,
    getProfEnseignements,
    getAllProfs,
    updateProfPlanning
};
