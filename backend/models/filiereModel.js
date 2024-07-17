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

const getPlanningName = async (id_filiere, semestre) => {
  return db.query(`
    SELECT planning FROM semestre_planning WHERE id_filiere = ? and semestre = ?
  `, [id_filiere, semestre])
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

const getAllFiliereInfos = () => {
  return db.query(`
    SELECT
      f.id_filiere,
      f.nom_filiere,
      COUNT(DISTINCT m.id_module) AS nb_modules,
      COUNT(DISTINCT sm.id_sous_module) AS nb_sous_modules,
      COUNT(DISTINCT e.ID_ETUDIANT) AS nb_etudiants
    FROM
      filiere f
    LEFT JOIN
      module m ON f.ID_FILIERE = m.ID_FILIERE
    LEFT JOIN
      sous_module sm ON m.ID_MODULE = sm.ID_MODULE
    LEFT JOIN
      etudiant e ON f.ID_FILIERE = e.ID_FILIERE
    GROUP BY
      f.ID_FILIERE;
  `);
}

const updateFiliereName = (nom_filiere, id_filiere) => {
  return db.query(`UPDATE filiere SET nom_filiere = ? WHERE id_filiere = ?`, [nom_filiere, id_filiere])
}

const getFiliereSemestres = async (id_filiere) => {
  return db.query(`
    SELECT 
      sp.id_planning, 
      sp.planning, 
      sp.semestre, 
      COUNT(DISTINCT m.id_module) as nb_modules,
      COUNT(DISTINCT sm.id_sous_module) as nb_sous_modules,
      COUNT(DISTINCT e.ID_ETUDIANT) as nb_etudiants 
    FROM 
      semestre_planning sp
      LEFT JOIN module m ON sp.ID_FILIERE = m.ID_FILIERE and sp.SEMESTRE = m.SEMESTRE
      LEFT JOIN sous_module sm ON m.ID_MODULE = sm.ID_MODULE
      LEFT JOIN etudiant e ON sp.ID_FILIERE = e.ID_FILIERE AND sp.SEMESTRE = e.SEMESTRE
    WHERE 
      sp.ID_FILIERE = ?
    GROUP BY sp.ID_PLANNING, sp.SEMESTRE; 
  `, [id_filiere])
}

const updatePlanning = (planning, id_filiere, semestre) => {
  return db.query(`
      UPDATE semestre_planning SET planning = ? WHERE id_filiere = ? and semestre = ?
      `, [planning, id_filiere, semestre]);
}

const deleteFiliere = (id_filiere) => {
  return db.query(`DELETE FROM filiere WHERE id_filiere = ?`, [id_filiere])
}

const deleteFiliereSemestres = async (id_filiere) => {
  return db.query(`delete from semestre_planning WHERE id_filiere = ?`, [id_filiere]);
}

const insertFiliere = async (nom_filiere) => {
  const result = await db.query(`insert into filiere (nom_filiere) VALUES (?)`, [nom_filiere])
  return result[0].insertId
}

const insertSemestre = (id_filiere, semestre) => {
  return db.query(`INSERT INTO semestre_planning (id_filiere, semestre, planning) VALUES (?, ?, NULL)`, [id_filiere, semestre])
}

const getFiliereSemestresNbEtudiants = async (id_filiere) => {
  return db.query(`
    SELECT semestre, COUNT(*) as nb_etudiants
    FROM etudiant
    WHERE ID_FILIERE = ?
    GROUP BY semestre
    ORDER BY semestre
  `, [id_filiere])
}

module.exports = {
  getAllFiliere,
  getFiliereProgram,
  getFiliereById,
  getYearModuleNumber,
  updateFiliereName,
  getAllFiliereInfos,
  getFiliereSemestres,
  updatePlanning,
  getPlanningName,
  deleteFiliere,
  insertFiliere,
  insertSemestre,
  deleteFiliereSemestres,
  getFiliereSemestresNbEtudiants
};
