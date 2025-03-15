// src/pages/sign_down.js
import React, { useState } from 'react';

function Sign_down() {
  const [message, setMessage] = useState('');

  const handleSignDown = async () => {
    setMessage('');
    try {
      const response = await fetch('/api/signdown', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Account deleted and signed out');
      } else {
        setMessage(data.error || 'Sign down failed');
      }
    } catch (error) {
      console.error('Sign down error:', error);
      setMessage('Network or server error');
    }
  };

  return (
    <div>
      <h1>Sign Down (Delete Account)</h1>
      <button onClick={handleSignDown}>Delete My Account</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Sign_down;
