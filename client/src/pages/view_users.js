// src/pages/view_users.js

import React, { useEffect, useState } from 'react';

function View_users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/view-users', {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      <h1>View Users</h1>
      <table>
        <thead>
          <tr>
            <th>user_id</th>
            <th>username</th>
            <th>password</th>
            <th>date_created</th>
            <th>date_updated</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td> {/* plain-text password */}
              <td>{user.date_created}</td>
              <td>{user.date_updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default View_users;
