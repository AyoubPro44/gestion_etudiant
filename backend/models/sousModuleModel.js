const db = require('../config/db');

const getAllSousModuleFiliere = () => {
    return db.query(`SELECT sm.ID_SOUS_MODULE, CONCAT(sm.NOM_SOUS_MODULE, ' (', f.NOM_FILIERE, ' S', m.SEMESTRE , ')') AS sous_module
                    from sous_module sm, module m, filiere f
                    where sm.ID_MODULE = m.ID_MODULE and f.ID_FILIERE = m.ID_FILIERE;
  `);
};

const insertSousModule = (id_module, nom_sous_module, coeff) => {
  return db.query(`
    INSERT INTO sous_module (id_module, nom_sous_module, coeff) VALUES (?, ?, ?)
  `, [id_module, nom_sous_module, coeff]);
}

const deleteSousModule = (id_sous_module) => {
  return db.query(`
    DELETE FROM sous_module WHERE id_sous_module = ?
  `, [id_sous_module]);
}

const updateSousModule = (id_sous_module, nom_sous_module, coeff) => {
  return db.query(`
    UPDATE sous_module SET nom_sous_module = ?, coeff = ? WHERE id_sous_module = ?
  `, [nom_sous_module, coeff, id_sous_module]);
}

module.exports = { 
  getAllSousModuleFiliere,
  insertSousModule,
  deleteSousModule,
  updateSousModule
};
