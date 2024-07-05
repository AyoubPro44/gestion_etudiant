const db = require('../config/db');

const getAllSousModuleFiliere = () => {
    return db.query(`SELECT sm.ID_SOUS_MODULE, CONCAT(sm.NOM_SOUS_MODULE, ' (', f.NOM_FILIERE, ' S', fm.SEMESTRE , ')') AS sous_module
                    FROM sous_module sm
                    JOIN filiere_module fm ON sm.ID_MODULE = fm.ID_MODULE
                    JOIN filiere f ON f.ID_FILIERE = fm.ID_FILIERE;
  `);
};

module.exports = { getAllSousModuleFiliere };
