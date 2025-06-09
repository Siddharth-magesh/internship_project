// src/components/Register.jsx

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    age: '',
    dob: '',
    contact: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/register', formData);
      setMessage(res.data.message);
      setFormData({
        username: '',
        password: '',
        age: '',
        dob: '',
        contact: ''
      });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registration failed');
    }
  };

  // Inline styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
  };

  const animatedBgStyle = {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle at 50% 50%, rgba(10, 132, 255, 0.2), transparent 70%)',
    animation: 'moveBg 20s linear infinite',
    zIndex: 0,
  };

  const cardStyle = {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid #eaeaea',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
    marginBottom: '6px',
    display: 'block',
    textAlign: 'left',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    fontSize: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '15px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const linkStyle = {
    fontSize: '14px',
    color: '#0a84ff',
    textDecoration: 'none',
  };

  const alertStyle = {
    padding: '12px',
    backgroundColor: '#e9f7ef',
    borderRadius: '8px',
    color: '#2e7d32',
    marginBottom: '15px',
    fontSize: '14px',
    textAlign: 'center',
    border: '1px solid #c8e6c9',
  };

  // For button hover effect state
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={containerStyle}>
      <div style={animatedBgStyle}></div>

      <div style={cardStyle}>
        <h2 style={titleStyle}>Signup</h2>

        {message && <div style={alertStyle}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle} htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="contact">Contact Info</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Register
          </button>
        </form>

        <p className="mt-3">
          Already have an account?{' '}
          <a href="/login" style={linkStyle}>
            Login here
          </a>
        </p>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes moveBg {
            0% { transform: translate(0, 0); }
            50% { transform: translate(25%, 25%); }
            100% { transform: translate(0, 0); }
          }
        `}
      </style>
    </div>
  );
};

export default Register;
