const db = require('../config/db');

const getAllFiliere = () => {
  return db.query('SELECT * FROM filiere');
};

module.exports = { getAllFiliere };
