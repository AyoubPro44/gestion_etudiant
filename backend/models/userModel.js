const db = require('../config/db');

const getAllUsers = () => {
  return db.query('SELECT * FROM users');
};

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id_user = ?', [id]);
};

const getUserByEmailPassword = (id, password) => {
  return db.query('SELECT * FROM users WHERE email = ? and password = ?', [id, password]);
};

const getUserByEmail = (email) => {
  return db.query('SELECT * FROM users WHERE email = ?', [email]);
};

const createUser = async (user) => {
  const { firstName, lastName, email, password, role } = user;
  const result = await db.query('INSERT INTO users (firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)', [firstName, lastName, email, password, role]);
  return result[0].insertId;
};

const updateInfos = async (id_user, firstname, lastname, email) => {
  return db.query(`UPDATE users SET firstname = ?, lastname = ?, email = ?
                  WHERE id_user = ?                
                  `, [firstname, lastname, email, id_user]);
}

const checkPassword = async (id_user, password) => {
  return db.query(`SELECT * FROM users WHERE id_user = ? AND password = ?`, [id_user, password]);
}

const updatePassword = async (id_user, password) => {
  return db.query(`UPDATE users SET password = ? WHERE id_user =?`, [password, id_user])
}

module.exports = { 
  getAllUsers, 
  getUserById, 
  getUserByEmailPassword, 
  getUserByEmail, 
  createUser, 
  updateInfos,
  checkPassword,
  updatePassword
};
