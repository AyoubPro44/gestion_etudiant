const db = require('../config/db');

const createEtudiant = (adresse, filiere, dateNaissance, numEtudiant, id_user) => {
  return db.query('Insert into etudiant (ID_USER, ID_FILIERE, DATE_DE_NAISSANCE, ADRESSE, ID_PARENT, NUM_ETUDIANT, SEMESTRE) values (?, ?, ?, ?, NULL, ?, 1)', [id_user, filiere, dateNaissance, adresse, numEtudiant]);
}

const getEtudiantByUserId = (userId) => {
  return db.query('SELECT * FROM etudiant WHERE ID_USER = ?', [userId]);
}

const getEtudiantPlanningName = (id_filiere, semestre) => {
  return db.query(`Select planning from filiere f, semestre_planning sp
                  where f.ID_FILIERE = sP.ID_FILIERE
                  and f.id_filiere = ? and sp.SEMESTRE = ?;`, [id_filiere, semestre])
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

const getEtudiantNotes = async (id_etudiant, year) => {
  return db.query(`
              select m.semestre, m.id_module, m.nom_module, sm.id_sous_module, sm.nom_sous_module, 
                     n.note_exam, n.note_tp, n.note_cc,
                     FORMAT(note_exam * 0.5 + note_tp * 0.25 + note_cc * 0.25, 2) as total_sous_module, sm.COEFF
              FROM notes n, sous_module sm, module m
              WHERE 
              n.ID_SOUS_MODULE = sm.ID_SOUS_MODULE 
              and m.id_module = sm.ID_MODULE
              and n.ID_ETUDIANT = ?
              and m.SEMESTRE in (?, ?);
              `, [id_etudiant, year * 2, (year * 2) - 1])
}

const updateInfos = async (id_etudiant, adresse, dateNaissance, numEtudiant) => {
  return db.query(`UPDATE etudiant SET NUM_ETUDIANT = ?, DATE_DE_NAISSANCE = ?, ADRESSE = ?
                    WHERE id_etudiant = ?    
                    `, [numEtudiant, dateNaissance, adresse, id_etudiant]);
}

const removeParent = async (id_etudiant) => {
  return db.query(`
    UPDATE etudiant SET id_parent = NULL WHERE id_etudiant = ?;
  `, [id_etudiant])
}

const addParent = async (num_etudiant, id_parent) => {
  return db.query(`
    UPDATE etudiant SET id_parent = ? WHERE num_etudiant = ?;
  `, [id_parent, num_etudiant])
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
  updateInfos,
  getEtudiantPlanningName,
  getEtudiantNotes,
  removeParent,
  addParent
};
