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

const getYearModuleNumber = async (id_filiere) => {
  return db.query(`
      SELECT
      CASE 
          WHEN m.semestre IN (1, 2) THEN 1
          WHEN m.semestre IN (3, 4) THEN 2
          WHEN m.semestre IN (5, 6) THEN 3
          WHEN m.semestre IN (7, 8) THEN 4
          WHEN m.semestre IN (9, 10) THEN 5
      END AS year,
      COUNT(DISTINCT m.id_module) AS nb_modules,
      COUNT(sm.id_sous_module) AS nb_sous_modules
      FROM
        module m
      JOIN
        sous_module sm ON m.id_module = sm.id_module
      WHERE
        ID_FILIERE = ?
      GROUP BY
        year;
  `, [id_filiere])
}

module.exports = {
  getAllFiliere,
  getFiliereProgram,
  getFiliereById,
  getYearModuleNumber
};
