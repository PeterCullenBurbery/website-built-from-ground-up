// import React, { useState } from 'react';

// function App() {
//   const [signupData, setSignupData] = useState({ username: '', password: '' });
//   const [signinData, setSigninData] = useState({ username: '', password: '' });
//   const [message, setMessage] = useState('');

//   // Handle sign up
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     try {
//       const response = await fetch('http://localhost:3001/api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(signupData)
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage(`Sign up successful! Welcome user: ${data.user.username}`);
//       } else {
//         setMessage(data.error || 'Sign up failed');
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage('An error occurred during sign up');
//     }
//   };

//   // Handle sign in
//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     try {
//       const response = await fetch('http://localhost:3001/api/signin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(signinData)
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage(`Sign in successful! Hello user: ${data.user.username}`);
//       } else {
//         setMessage(data.error || 'Sign in failed');
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage('An error occurred during sign in');
//     }
//   };

//   return (
//     <div>
//       <h1>Simple React App</h1>

//       {/* Sign Up Form */}
//       <div style={{ border: '1px solid #000', padding: '20px', marginBottom: '20px' }}>
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSignup}>
//           <div>
//             <label>Username: </label>
//             <input
//               type="text"
//               value={signupData.username}
//               onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
//               required
//             />
//           </div>
//           <div>
//             <label>Password: </label>
//             <input
//               type="password"
//               value={signupData.password}
//               onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
//               required
//             />
//           </div>
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>

//       {/* Sign In Form */}
//       <div style={{ border: '1px solid #000', padding: '20px' }}>
//         <h2>Sign In</h2>
//         <form onSubmit={handleSignIn}>
//           <div>
//             <label>Username: </label>
//             <input
//               type="text"
//               value={signinData.username}
//               onChange={(e) => setSigninData({ ...signinData, username: e.target.value })}
//               required
//             />
//           </div>
//           <div>
//             <label>Password: </label>
//             <input
//               type="password"
//               value={signinData.password}
//               onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
//               required
//             />
//           </div>
//           <button type="submit">Sign In</button>
//         </form>
//       </div>

//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default App;
// import React, { useState } from 'react';

// function App() {
//   const [signinData, setSigninData] = useState({ username: '', password: '' });
//   const [message, setMessage] = useState('');

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/signin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include', // important for session cookies
//         body: JSON.stringify(signinData)
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage(data.message || 'Signed in successfully!');
//       } else {
//         setMessage(data.error || 'Failed to sign in');
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage('Network error');
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       const response = await fetch('/api/signout', {
//         method: 'POST',
//         credentials: 'include'
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage(data.message || 'Signed out successfully');
//       } else {
//         setMessage(data.error || 'Failed to sign out');
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage('Network error');
//     }
//   };

//   const handleCheckProtected = async () => {
//     try {
//       const response = await fetch('/api/protected', {
//         method: 'GET',
//         credentials: 'include'
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage(data.message);
//       } else {
//         setMessage(data.error);
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage('Network error');
//     }
//   };

//   return (
//     <div>
//       <h1>Cookie Session Example</h1>

//       <form onSubmit={handleSignIn}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={signinData.username}
//           onChange={(e) => setSigninData({ ...signinData, username: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={signinData.password}
//           onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
//         />
//         <button type="submit">Sign In</button>
//       </form>

//       <button onClick={handleSignOut}>Sign Out</button>
//       <button onClick={handleCheckProtected}>Check Protected</button>

//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default App;
// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/home';
// import View_users from './pages/view_users';
// import Sign_in from './pages/sign_in';
// import Sign_up from './pages/sign_up';
// import Sign_out from './pages/sign_out';
// import Sign_down from './pages/sign_down';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/view-users" element={<View_users />} />

//         <Route path="/sign-in" element={<Sign_in />} />
//         <Route path="/sign-up" element={<Sign_up />} />
//         <Route path="/sign-out" element={<Sign_out />} />
//         <Route path="/sign-down" element={<Sign_down />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import View_users from './pages/view_users';
import Sign_in from './pages/sign_in';
import Sign_up from './pages/sign_up';
import Sign_out from './pages/sign_out';
import Sign_down from './pages/sign_down';

// Import the Nav_bar component
import Nav_bar from './components/nav_bar';

function App() {
  return (
    <Router>
      {/* Render Nav_bar on every page */}
      <Nav_bar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view-users" element={<View_users />} />
        <Route path="/sign-in" element={<Sign_in />} />
        <Route path="/sign-up" element={<Sign_up />} />
        <Route path="/sign-out" element={<Sign_out />} />
        <Route path="/sign-down" element={<Sign_down />} />
      </Routes>
    </Router>
  );
}

export default App;
