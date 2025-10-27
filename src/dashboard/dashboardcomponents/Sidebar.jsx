import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/dashboard/profile', label: 'Profile', icon: '👤' },
    { path: '/dashboard/tables', label: 'Tables', icon: '📋' },
    { path: '/dashboard/billboards', label: 'Billboards', icon: '🏢' },
    { path: '/dashboard/analytics', label: 'Analytics', icon: '📈' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Billboard HQ</h2>
        <p className="text-sm opacity-75">Admin Panel</p>
      </div>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-bar" 
        />
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className={isActive(item.path) ? 'active' : ''}>
              <Link to={item.path}>
                <span className="icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <Link to="/" className="back-to-site">
          ← Back to Main Site
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
