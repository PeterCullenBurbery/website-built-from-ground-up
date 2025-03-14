// src/pages/sign_out.js
import React, { useState } from 'react';

function Sign_out() {
  const [message, setMessage] = useState('');

  const handleSignOut = async () => {
    setMessage('');
    try {
      const response = await fetch('/api/signout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Signed out successfully');
      } else {
        setMessage(data.error || 'Sign out failed');
      }
    } catch (error) {
      console.error('Sign out error:', error);
      setMessage('Network or server error');
    }
  };

  return (
    <div>
      <h1>Sign Out</h1>
      <button onClick={handleSignOut}>Click to Sign Out</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Sign_out;
