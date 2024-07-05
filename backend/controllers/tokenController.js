const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class TokenController {

  async getToken(req, res) {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      const [users] = await User.getUserByEmail(email);
      const user = users[0];
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (!user.PASSWORD) {
        return res.status(500).json({ message: 'User password is missing' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user.ID_USER, email: user.EMAIL }, 'key', { expiresIn: '1h' });
  
      return res.status(200).json({ token });
    } catch (e) {
      console.error('Error generating token:', e);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
}

module.exports = new TokenController();
