const User = require('../models/userModel');
const Etudiant = require('../models/etudiantModel');
const jwt = require('jsonwebtoken');
const Prof = require('../models/profModel');
const Parent = require('../models/parentModel');
const Admin = require('../models/adminModel');

class UserController {
  async getUsers(req, res) {
    try {
      const [users] = await User.getAllUsers();
      return res.json(users);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getUserById(req, res) {
    try {
      const [user] = await User.getUserById(req.params.id);
      if (user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user[0]);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const [users] = await User.getUserByEmail(email);
      const user = users[0];

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (password !== user.PASSWORD) { // Replace with direct comparison
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.ID_USER, email: user.EMAIL }, 'key');

      if(user.ROLE == "etudiant") {
        const [ etudiants ] = await Etudiant.getEtudiantByUserId(user.ID_USER);
        user.etudiant = etudiants[0]
      }
      else if(user.ROLE == "parent") {
        const [ parents ] = await Parent.getParentByUserId(user.ID_USER)
        user.ID_PARENT = parents[0].ID_PARENT;
      }
      else if(user.ROLE == "admin") {
        const [ admins ] = await Admin.getAdminByUserId(user.ID_USER)
        user.ID_ADMIN = admins[0].ID_ADMINISTRATEUR;
      }
      else if(user.ROLE == "professeur") {
        const [ profs ] = await Prof.getProfByUserId(user.ID_USER)
        user.ID_PROF = profs[0].ID_PROFESSEUR
        user.num_bureau = profs[0].NUM_BUREAU
      }
      

      return res.status(200).json({ user, token });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  
  async checkEmail(req, res) {
    try {
      const { email } = req.body
      const [user] = await User.getUserByEmail(email);
      if (user.length === 0) {
        return res.status(200).json({ isFound: false });
      }
      return res.status(200).json({ isFound: true });
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createNewUser(req, res) {
    try {
      const { user } = req.body;

      const newUserId = await User.createUser(user);
      if(user.role == "etudiant")
        Etudiant.createEtudiant(user.adresse, user.filiere, user.dateNaissance, user.numEtudiant, newUserId)
      else if(user.role == "professeur")
        Prof.createProfesseur(user.numBureau, newUserId, user.sousModules);
      else if(user.role == "parent")
        Parent.createParent(user.numEtudiant, newUserId);
      else if(user.role == "admin")
        Admin.createAdmin(newUserId)
      
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to create user' });
    }
  }
}

module.exports = new UserController();
