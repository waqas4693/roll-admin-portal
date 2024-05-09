import React, { useState } from 'react';
import axios from 'axios';
import url from '../src/config/server-url.jsx';

const AdminLogin = ({ handleAuthentication }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
  try {
    const response = await axios.post(url+"api/auth/login", { email, password });
    const { token } = response.data;
    console.log('Login successful. Token:', token);
    handleAuthentication(true); 


  } catch (error) {
    setError('Login failed');
    console.error(error);
  }
};


  return (
    <div className="form-container">
      <h1>Login Form</h1>
      {error && <p className="error-message">{error}</p>}
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
      <button onClick={handleLogin} className="form-button">Login</button>
    </div>
  );
};

export default AdminLogin;