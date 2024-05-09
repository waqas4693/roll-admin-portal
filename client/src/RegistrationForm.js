import React, { useState } from 'react';
import axios from 'axios';
import url from '../src/config/server-url.jsx';
const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(url+"api/auth/register", { email, password });
      console.log('Registration successful');
    } catch (error) {
      setError('Registration failed');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h1>Registration Form</h1>
      {error && <p className="error-message">{error}</p>}
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
      <div>
        <button onClick={handleRegister} className="form-button">Register</button>
      </div>
      
    </div>
  );
};

export default RegisterForm;
