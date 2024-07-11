const db = require('../config/db');

const getNbSousModule = async (id_module) => {
    return db.query(`SELECT count(*) as nb_sous_module FROM sous_module sm, module m where sm.id_module = m.id_module and m.id_module = ?`, [id_module]);
}


module.exports = { 
    getNbSousModule
};