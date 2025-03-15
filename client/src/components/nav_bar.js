// src/components/nav_bar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Nav_bar() {
  return (
    <nav>
      <Link to="/">Home</Link> |{' '}
      <Link to="/view-users">View Users</Link> |{' '}
      <Link to="/sign-up">Sign Up</Link> |{' '}
      <Link to="/sign-in">Sign In</Link> |{' '}
      <Link to="/sign-out">Sign Out</Link> |{' '}
      <Link to="/sign-down">Sign Down</Link>
    </nav>
  );
}

export default Nav_bar;
