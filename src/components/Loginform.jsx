import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../data/users.json';

const Loginform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    console.log("Login Attempt:", email, password);
    console.log("Matched User:", user);

    if (user) {
      if (user.role === 'admin') {
        // Save to localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        localStorage.setItem('allUsers', JSON.stringify(users));
        navigate('/admin');
      } else {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        navigate('/employee');
      }
    } else {
      alert('Invalid email or password');
    }
  };

  return (
<div
  className="container-fluid d-flex justify-content-center align-items-center vh-100"
  style={{
    background: 'linear-gradient(to right, #5325d1ff, #3b24c2ff, #2c5364)',
  }}
>
  <div
    className="card p-4 shadow-lg"
    style={{
      width: '100%',
      maxWidth: '400px',
height:'300px',
      borderRadius: '15px',
      backgroundColor: '#ffffffee',
    }}
  >
    <h2 className="text-center mb-4 text-primary">Login</h2>
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
    </form>
  </div>
</div>


  );
};

export default Loginform;
