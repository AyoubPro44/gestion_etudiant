const db = require('../config/db');

const createEtudiant = (adresse, filiere, dateNaissance, numEtudiant, id_user) => {
  return db.query('Insert into etudiant (ID_USER, ID_FILIERE, DATE_DE_NAISSANCE, ADRESSE, ID_PARENT, NUM_ETUDIANT, SEMESTRE) values (?, ?, ?, ?, NULL, ?, 1)', [id_user, filiere, dateNaissance, adresse, numEtudiant]);
}

const getEtudiantByUserId = (userId) => {
  return db.query('SELECT * FROM etudiant WHERE ID_USER = ?', [userId]);
}

const getEtudiantByNum = (numEtudiant) => {
  return db.query('SELECT * FROM etudiant WHERE NUM_ETUDIANT = ?', [numEtudiant]);
}

const getEtudiantsByFiliere = (id_filiere, semestre) => {
  return db.query(`select firstname, lastname, email, num_etudiant, DATE_FORMAT(date_de_naissance, '%Y-%m-%d') AS date_de_naissance, adresse 
                  from etudiant e, users u 
                  where e.ID_USER = u.ID_USER 
                  and e.semestre = ?
                  and id_filiere = ?`, [semestre, id_filiere])
}

const getEtudiantsWithNotes = (id_sous_module, id_filiere, semestre) => {
  return db.query(`SELECT e.id_etudiant, e.num_etudiant, u.FIRSTNAME, u.LASTNAME, n.note_exam, n.note_tp, n.note_cc, n.date
                  FROM etudiant e
                  JOIN users u ON e.ID_USER = u.ID_USER
                  LEFT JOIN notes n ON e.ID_ETUDIANT = n.ID_ETUDIANT AND n.ID_SOUS_MODULE = ?
                  WHERE e.ID_FILIERE = ? AND e.SEMESTRE = ?;`, [id_sous_module, id_filiere, semestre])
}

module.exports = { createEtudiant, getEtudiantByNum, getEtudiantByUserId, getEtudiantsByFiliere, getEtudiantsWithNotes };
