// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db/mysql');
const mongoDB = require('../db/mongo');

const SALT_ROUNDS = 10;

router.post('/register', async (req, res) => {
  const { username, password, age, dob, contact } = req.body;

  try {
    const [userExists] = await pool.execute(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (userExists.length > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const [result] = await pool.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    const userId = result.insertId;

    const db = await mongoDB;
    const profileCollection = db.collection('profiles');

    await profileCollection.insertOne({
      userId,
      username,
      age,
      dob,
      contact
    });

    return res.json({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Get user with matching username
    const [users] = await pool.execute(
      'SELECT id, password FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Compare entered password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Login successful
    return res.json({ message: 'Login successful', userId: user.id });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
