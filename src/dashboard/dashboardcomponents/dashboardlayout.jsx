import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './dashboardStyles.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
