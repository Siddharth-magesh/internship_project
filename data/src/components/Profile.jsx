// src/components/Profile.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    age: '',
    dob: '',
    contact: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/profile/${userId}`);
        setProfileData(res.data);
      } catch (error) {
        setMessage('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, [userId, navigate]);

  const handleChange = (e) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/profile/update', {
        userId,
        ...profileData
      });
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
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

  const buttonStylePrimary = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#0a84ff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'background-color 0.3s',
  };

  const buttonStyleSecondary = {
    ...buttonStylePrimary,
    backgroundColor: '#6c757d',
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

  return (
    <div style={containerStyle}>
      <div style={animatedBgStyle}></div>

      <div style={cardStyle}>
        

        <h2 style={titleStyle}>Your Profile</h2>

        {message && <div style={alertStyle}>{message}</div>}

        <form onSubmit={handleUpdate}>
          <div>
            <label style={labelStyle}>Age</label>
            <input
              type="number"
              name="age"
              value={profileData.age}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={profileData.dob}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Contact Info</label>
            <input
              type="text"
              name="contact"
              value={profileData.contact}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStylePrimary}>
            Save Changes
          </button>

          <button type="button" style={buttonStyleSecondary} onClick={handleLogout}>
            Logout
          </button>
        </form>
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

export default Profile;
