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
    return db.query(`select sm.id_sous_module, nom_sous_module, nom_module, nom_filiere, f.id_filiere, m.semestre, count(id_etudiant) as nb_etudiant from enseigne e, sous_module sm, module m, filiere f, etudiant et
                    where e.ID_SOUS_MODULE = sm.ID_SOUS_MODULE 
                    and sm.ID_MODULE = m.ID_MODULE 
                    and m.ID_FILIERE = f.ID_FILIERE 
                    and et.ID_FILIERE = f.ID_FILIERE
                    and m.SEMESTRE = et.SEMESTRE
                    and e.ID_PROFESSEUR = ?
                    group by sm.id_sous_module, m.ID_MODULE, m.SEMESTRE;`, [profId]);
}

module.exports = { createProfesseur, getProfByUserId, getProfCourses };
