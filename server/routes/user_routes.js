// routes/user_routes.js

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// EXAMPLE: If your pool is defined in a separate file (e.g., db.js),
// you could import it here. Otherwise, define it directly:
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'website_designed_from_the_ground_up',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432
});

/**
 * VIEW USERS
 * GET /api/view-users
 * Returns all users, including plain-text passwords.
 * WARNING: This is a major security risk in production.
 */
router.get('/view-users', async (req, res) => {
  try {
    // Optionally, you might require a session check here:
    // if (!req.session.userId) {
    //   return res.status(401).json({ error: 'Not signed in' });
    // }
    // Possibly also check if the user is "admin" or has privileges.

    const result = await pool.query(`
      SELECT
        user_id,
        username,
        password,
        date_created,
        date_updated
      FROM table_of_users
      ORDER BY date_created ASC
    `);

    // Return array of user objects
    return res.status(200).json(result.rows);

  } catch (error) {
    console.error('View Users Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
