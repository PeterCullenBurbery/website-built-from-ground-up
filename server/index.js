// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);
// const { Pool } = require('pg');

// const app = express();
// const PORT = process.env.PORT || 3001;

// // We'll parse JSON bodies
// app.use(express.json());

// // Configure the PostgreSQL pool
// const pool = new Pool({
//   user: process.env.DB_USER || 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   database: process.env.DB_NAME || 'website_designed_from_the_ground_up',
//   password: process.env.DB_PASSWORD || 'your_password',
//   port: process.env.DB_PORT || 5432,
// });

// // ----------------------------------------------
// // 1) CORS Setup (Important for sending cookies)
// // ----------------------------------------------
// // In development, your React app might be at http://localhost:3000.
// // We must allow credentials & specify the origin for cookie support.
// app.use(
//   cors({
//     origin: 'http://localhost:3000', // front-end origin
//     credentials: true,               // allow session cookie from browser
//   })
// );

// // ----------------------------------------------
// // 2) Session Middleware
// // ----------------------------------------------
// app.use(
//   session({
//     store: new pgSession({
//       pool: pool,           // Connection pool
//       tableName: 'table_of_sessions', // Default: 'session' (you can rename if you want)
//       createTableIfMissing: true, // If you want the table created automatically
//     }),
//     secret: 'SUPER_SECRET_KEY', // Replace with a strong, random key in production
//     resave: false,              // Only save the session if it was modified
//     saveUninitialized: false,   // Don’t create session until something stored
//     cookie: {
//       httpOnly: true,       // No JavaScript access to cookies
//       secure: false,        // Set 'true' if your site uses HTTPS in production
//       maxAge: 1000 * 60 * 60 * 24, // e.g. 1 day in milliseconds
//     },
//   })
// );

// // Quick test route
// app.get('/', (req, res) => {
//   res.send('Server is running...');
// });

// // ----------------------------------------------
// // 3) SIGN UP (Create Account)
// // ----------------------------------------------
// app.post('/api/signup', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Check if user already exists
//     const checkUser = await pool.query(
//       'SELECT user_id FROM table_of_users WHERE username = $1',
//       [username]
//     );
//     if (checkUser.rows.length > 0) {
//       return res.status(400).json({ error: 'Username already in use' });
//     }

//     // Insert user (storing plain text password here as you indicated)
//     const insertUser = await pool.query(
//       `INSERT INTO table_of_users (username, password)
//        VALUES ($1, $2) RETURNING user_id, username`,
//       [username, password]
//     );

//     const newUser = insertUser.rows[0];
//     return res.status(201).json({ message: 'User created', user: newUser });
//   } catch (err) {
//     console.error('Signup Error:', err);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // ----------------------------------------------
// // 4) SIGN IN (formerly "login")
// // ----------------------------------------------
// app.post('/api/signin', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Lookup user
//     const userResult = await pool.query(
//       'SELECT user_id, username, password FROM table_of_users WHERE username = $1',
//       [username]
//     );
//     if (userResult.rows.length === 0) {
//       return res.status(400).json({ error: 'Invalid username or password' });
//     }
//     const user = userResult.rows[0];

//     // Compare plain text password
//     if (user.password !== password) {
//       return res.status(400).json({ error: 'Invalid username or password' });
//     }

//     // Attach user info to session
//     req.session.userId = user.user_id;
//     req.session.username = user.username;

//     // Optionally store more session data if needed
//     // req.session.role = 'admin';

//     return res.status(200).json({ message: 'Sign in successful' });
//   } catch (err) {
//     console.error('Signin Error:', err);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // ----------------------------------------------
// // 5) SIGN OUT (destroy session)
// // ----------------------------------------------
// app.post('/api/signout', (req, res) => {
//   // Destroy the session in the store
//   req.session.destroy((err) => {
//     if (err) {
//       console.error('Signout Error:', err);
//       return res.status(500).json({ error: 'Could not sign out' });
//     }
//     // Clear the cookie on the client
//     res.clearCookie('connect.sid'); // The default cookie name is "connect.sid"
//     return res.status(200).json({ message: 'Signed out successfully' });
//   });
// });

// // ----------------------------------------------
// // 6) Protected Route Example
// // ----------------------------------------------
// app.get('/api/protected', (req, res) => {
//   // Check if user is signed in
//   if (!req.session.userId) {
//     return res.status(401).json({ error: 'Not signed in' });
//   }
//   // The user is authenticated
//   return res.status(200).json({
//     message: `Hello ${req.session.username}, welcome to the protected route!`
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');

// 1) Import the route files we created
const authRoutes = require('./routes/auth_routes');
const usersRoutes = require('./routes/user_routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// 2) Set up DB pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'website_designed_from_the_ground_up',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432
});

// 3) Session middleware
app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: 'table_of_sessions'
  }),
  secret: 'SUPER_SECRET_KEY',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 86400000 // 1 day
  }
}));

// 4) Test route (optional)
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// 5) Mount the route files under /api
app.use('/api', authRoutes);
app.use('/api', usersRoutes);

// 6) Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
