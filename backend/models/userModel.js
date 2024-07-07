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

module.exports = { getAllUsers, getUserById, getUserByEmailPassword, getUserByEmail, createUser };
