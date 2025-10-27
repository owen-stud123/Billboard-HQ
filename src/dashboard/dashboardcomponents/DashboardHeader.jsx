import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = ({ title = 'Dashboard' }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/dashboard/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{"name": "Admin User"}');

  return (
    <div className="dashboard-header">
      <div className="header-left">
        <h3>{title}</h3>
        <p className="breadcrumb">Home / {title}</p>
      </div>
      <div className="header-right">
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
