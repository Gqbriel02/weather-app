// controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred', err: error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};


exports.editAccount = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the token in the middleware
    const { newUsername } = req.body;

    // Update the user's username
    await User.update(
      { username: newUsername },
      { where: { id: userId } }
    );

    res.json({ message: 'Username updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};



exports.getAuthUser = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the token in the middleware
    
    const user = await User.findOne({ where: { id: userId } });

    if (user) {
      res.json({ message: 'Username found', user: user });
    }else{
      res.json({ message: 'Username not found', user: null });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};



