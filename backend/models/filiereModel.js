const db = require('../config/db');

const getAllFiliere = () => {
  return db.query('SELECT * FROM filiere');
};

const getFiliereProgram = async (id_filiere) => {
  return db.query(`
          SELECT m.ID_MODULE, m.NOM_MODULE, m.SEMESTRE, sm.NOM_SOUS_MODULE, sm.COEFF
          FROM module m
          LEFT JOIN sous_module sm ON m.ID_MODULE = sm.ID_MODULE
          WHERE m.ID_FILIERE = ?
          ORDER BY m.SEMESTRE, m.ID_MODULE, sm.ID_SOUS_MODULE;
        `, [id_filiere])
}

const getFiliereById = async (id_filiere) => {
  return db.query('SELECT * FROM filiere WHERE ID_FILIERE = ?', [id_filiere]);
}

module.exports = {
  getAllFiliere,
  getFiliereProgram,
  getFiliereById
};
