const db = require('../config/db');

const getAllSousModuleFiliere = () => {
    return db.query(`SELECT sm.ID_SOUS_MODULE, CONCAT(sm.NOM_SOUS_MODULE, ' (', f.NOM_FILIERE, ' S', m.SEMESTRE , ')') AS sous_module
                    from sous_module sm, module m, filiere f
                    where sm.ID_MODULE = m.ID_MODULE and f.ID_FILIERE = m.ID_FILIERE;
  `);
};

module.exports = { getAllSousModuleFiliere };
