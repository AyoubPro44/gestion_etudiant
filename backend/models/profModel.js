const db = require('../config/db');

const createProfesseur = async (numBureau, id_user, sousModules) => {
    const result = await db.query('Insert into professeur (ID_USER, NUM_BUREAU) values (?, ?)', [id_user,numBureau]);
    for (let i = 0; i < sousModules.length; i++) {
        db.query('Insert into enseigne (ID_PROFESSEUR, ID_SOUS_MODULE) values (?, ?)', [result[0].insertId, sousModules[i]]);
    }
}

const getProfByUserId = async (userId) => {
    return db.query('select * from professeur where ID_USER = ?', [userId]);
}

const getProfCourses = async (profId) => {
    return db.query(`select nom_sous_module, nom_module, nom_filiere, semestre from enseigne e, sous_module sm, module m, filiere_module fm, filiere f 
                    where e.ID_SOUS_MODULE = sm.ID_SOUS_MODULE 
                    and sm.ID_MODULE = m.ID_MODULE 
                    and m.ID_MODULE = fm.ID_MODULE 
                    and fm.ID_FILIERE = f.ID_FILIERE 
                    and e.ID_PROFESSEUR = ?`, [profId]);
}

module.exports = { createProfesseur, getProfByUserId, getProfCourses };
