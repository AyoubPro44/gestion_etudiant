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

module.exports = { createEtudiant, getEtudiantByNum, getEtudiantByUserId };
