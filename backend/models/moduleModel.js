const db = require('../config/db');

const getNbSousModule = async (id_module) => {
    return db.query(`SELECT count(*) as nb_sous_module FROM sous_module sm, module m where sm.id_module = m.id_module and m.id_module = ?`, [id_module]);
}

const getModulesFiliere = async (id_filiere) => {
    return db.query(`
        SELECT 
            m.id_module, 
            m.nom_module, 
            m.semestre, 
            COUNT(sm.ID_SOUS_MODULE) as nb_sous_modules
        FROM 
            module m
        LEFT JOIN 
            sous_module sm 
        ON 
            m.ID_MODULE = sm.ID_MODULE
        WHERE 
            m.ID_FILIERE = ?
        GROUP BY 
            m.ID_MODULE, 
            m.NOM_MODULE, 
            m.SEMESTRE
        ORDER BY 
            m.SEMESTRE;

    `, [id_filiere])
}

const insertModule = (id_filiere, nom_module, semestre) => {
    return db.query(`
        INSERT INTO module (id_filiere, nom_module, semestre) VALUES (?, ?, ?)
    `, [id_filiere, nom_module, semestre])
}

const deleteModule = (id_module) => {
    return db.query(`
        DELETE FROM module WHERE id_module = ?
    `, [id_module])
}

const updateModule = (id_module, nom_module, semestre) => {
    return db.query(`
        UPDATE module SET nom_module = ? , semestre = ? WHERE id_module = ?
    `, [nom_module, semestre, id_module])
}

const getSousModulesByIdModule = (id_module) => {
    return db.query(`
        SELECT id_sous_module, nom_sous_module, coeff
        FROM sous_module
        WHERE ID_MODULE = ?
    `, [id_module])
}

module.exports = {
    getNbSousModule,
    getModulesFiliere,
    insertModule,
    deleteModule,
    updateModule,
    getSousModulesByIdModule
};