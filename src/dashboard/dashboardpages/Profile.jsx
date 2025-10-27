import React from 'react';
import DashboardHeader from '../dashboardcomponents/DashboardHeader';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="dashboard-content">
      <DashboardHeader title="Profile" />
      
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user.name ? user.name.charAt(0) : 'U'}
            </div>
          </div>
          
          <div className="profile-info">
            <h3>{user.name || 'User'}</h3>
            <p className="profile-role">{user.role || 'User'}</p>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <label>Username</label>
              <p>{user.username || 'N/A'}</p>
            </div>
            <div className="detail-item">
              <label>Email</label>
              <p>{user.email || 'admin@billboardhq.com'}</p>
            </div>
            <div className="detail-item">
              <label>Phone</label>
              <p>{user.phone || '+1 (555) 123-4567'}</p>
            </div>
            <div className="detail-item">
              <label>Role</label>
              <p>{user.role || 'Administrator'}</p>
            </div>
          </div>

          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
