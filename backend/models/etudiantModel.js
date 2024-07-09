const db = require('../config/db');

const createEtudiant = (adresse, filiere, dateNaissance, numEtudiant, id_user) => {
  return db.query('Insert into etudiant (ID_USER, ID_FILIERE, DATE_DE_NAISSANCE, ADRESSE, ID_PARENT, NUM_ETUDIANT, SEMESTRE) values (?, ?, ?, ?, NULL, ?, 1)', [id_user, filiere, dateNaissance, adresse, numEtudiant]);
}

const getEtudiantByUserId = (userId) => {
  return db.query('SELECT * FROM etudiant WHERE ID_USER = ?', [userId]);
}

const getEtudiantPlanningName = (id_filiere) => {
  return db.query('Select planning from filiere where id_filiere = ?',[id_filiere])
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
  return db.query(`SELECT e.id_etudiant, e.num_etudiant, u.firstname, u.lastname, n.note_exam, n.note_tp, n.note_cc, n.date
                  FROM etudiant e
                  JOIN users u ON e.ID_USER = u.ID_USER
                  LEFT JOIN notes n ON e.ID_ETUDIANT = n.ID_ETUDIANT AND n.ID_SOUS_MODULE = ?
                  WHERE e.ID_FILIERE = ? AND e.SEMESTRE = ?;`, [id_sous_module, id_filiere, semestre])
}


const checkNote = (id_etudiant, id_sous_module) => {
  return db.query(`SELECT * FROM notes WHERE id_etudiant = ?  and id_sous_module = ?;`, [id_etudiant, id_sous_module]);
}


const insertNote = (id_etudiant, id_sous_module, note_exam, note_tp, note_cc) => {
  return db.query(`INSERT INTO notes (id_etudiant, id_sous_module, note_exam, note_tp, note_cc, date) VALUES (?, ?, ?, ?, ?, CURRENT_DATE)`, [id_etudiant, id_sous_module, note_exam, note_tp, note_cc])
}

const updateNote = (id_etudiant, id_sous_module, note_exam, note_tp, note_cc) => {
  return db.query(`UPDATE notes SET note_exam = ?, note_tp = ?, note_cc = ?, date = CURRENT_DATE 
                  where id_etudiant = ? and id_sous_module = ? `,
    [note_exam, note_tp, note_cc, id_etudiant, id_sous_module])
}


module.exports = { 
  createEtudiant, 
  getEtudiantByNum, 
  getEtudiantByUserId, 
  getEtudiantsByFiliere, 
  getEtudiantsWithNotes, 
  checkNote, 
  insertNote, 
  updateNote,
  getEtudiantPlanningName
};
