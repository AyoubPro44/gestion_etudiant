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

const updateInfos = async (id_prof, num_bureau) => {
    return db.query(`UPDATE professeur SET num_bureau = ?
                    WHERE id_professeur = ?                
                    `, [num_bureau,id_prof]);
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

const saveReport = async (id_porf, report_content) => {
    return db.query(`INSERT INTO report (ID_PROFESSEUR, report_content, date_report)
                    VALUES (?, ?, CURRENT_DATE)`, [id_porf, report_content])
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
    saveReport
};
