// routes/auth_routes.js

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// EXAMPLE: If your pool is defined in a separate "db.js" file, you could do:
// const pool = require('../db');
// Otherwise, define it here directly:
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'website_designed_from_the_ground_up',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432
});

/**
 * SIGN UP: Create a new user account in table_of_users,
 * storing the password in plain text (strongly discouraged in real-world).
 */
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username is already in use
    const checkUser = await pool.query(
      'SELECT user_id FROM table_of_users WHERE username = $1',
      [username]
    );
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username already in use' });
    }

    // Insert into table_of_users
    const insertUser = await pool.query(
      `INSERT INTO table_of_users (username, password)
       VALUES ($1, $2)
       RETURNING user_id, username, date_created, date_updated`,
      [username, password]
    );

    const newUser = insertUser.rows[0];
    return res.status(201).json({
      message: 'User created successfully',
      user: newUser
    });

  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * SIGN IN: Check credentials, store user info in the session.
 * Expects plain-text password matching the stored plain-text password.
 */
router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const userResult = await pool.query(
      'SELECT user_id, username, password FROM table_of_users WHERE username = $1',
      [username]
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const user = userResult.rows[0];

    // Compare plain-text password (insecure!)
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Store user info in session
    req.session.userId = user.user_id;
    req.session.username = user.username;

    return res.status(200).json({ message: 'Sign in successful' });

  } catch (error) {
    console.error('Signin Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * SIGN OUT: Destroy the session, removing access.
 */
router.post('/signout', (req, res) => {
  // Destroying the session in the store
  req.session.destroy((err) => {
    if (err) {
      console.error('Signout Error:', err);
      return res.status(500).json({ error: 'Could not sign out' });
    }
    // Clear the session cookie on the client
    res.clearCookie('connect.sid');
    return res.status(200).json({ message: 'Signed out successfully' });
  });
});

/**
 * SIGN DOWN: Delete the user's account from table_of_users.
 * In practice, you'd confirm user identity first or check session for userId.
 */
router.post('/signdown', async (req, res) => {
  try {
    // For example, let's assume the user must be signed in
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not signed in' });
    }

    // Delete user from table_of_users
    await pool.query(
      'DELETE FROM table_of_users WHERE user_id = $1',
      [req.session.userId]
    );

    // Also destroy session
    req.session.destroy((err) => {
      if (err) {
        console.error('Signdown Error:', err);
        return res.status(500).json({ error: 'Could not sign down properly' });
      }
      res.clearCookie('connect.sid');
      return res.status(200).json({ message: 'Account deleted and signed out' });
    });

  } catch (error) {
    console.error('Signdown Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
