import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ทำการล็อกอิน (authentication)
    // ถ้าล็อกอินสำเร็จ
    navigate('/tasks');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className={styles.button}>Login</button>
    </form>
  );
}

export default LoginForm;
