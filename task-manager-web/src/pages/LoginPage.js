import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginPage.module.css';

const LoginPage = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace the URL with your actual login endpoint
      const response = await axios.post('http://localhost:5000/api/login', { email, password });

      if (response && response.data && response.data.token) {
        // Save the token to localStorage
        localStorage.setItem('token', response.data.token);
        handleLogin(); // Notify the parent component of login
        navigate('/profile'); // Redirect to profile page
      } else if (response && response.data) {
        alert(response.data.message); // Show server-side validation messages
      } else {
        alert('Unexpected response format'); // Handle unexpected responses
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert('Error: ' + error.response.data.message); // Show server-side error messages
      } else {
        alert('Unexpected error occurred'); // Handle general errors
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.button}>Login</button>
    </form>
  );
};

export default LoginPage;
