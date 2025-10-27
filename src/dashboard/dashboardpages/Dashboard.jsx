import React from 'react';
import DashboardHeader from '../dashboardcomponents/DashboardHeader';
import StatCard from '../dashboardcomponents/StatCard';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Billboards',
      value: '156',
      icon: '🏢',
      trend: 'up',
      trendValue: '12%',
      color: 'blue'
    },
    {
      title: 'Active Campaigns',
      value: '42',
      icon: '📢',
      trend: 'up',
      trendValue: '8%',
      color: 'green'
    },
    {
      title: 'Total Revenue',
      value: '$124,500',
      icon: '💰',
      trend: 'up',
      trendValue: '23%',
      color: 'orange'
    },
    {
      title: 'Pending Requests',
      value: '15',
      icon: '⏳',
      trend: 'down',
      trendValue: '5%',
      color: 'red'
    }
  ];

  return (
    <div className="dashboard-content">
      <DashboardHeader title="Dashboard Overview" />
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h4>Sales Performance</h4>
          <div className="chart-placeholder">
            <p>📊 Chart visualization will go here</p>
            <p className="text-sm">Consider using Chart.js or Recharts</p>
          </div>
        </div>
        
        <div className="chart-card">
          <h4>Billboard Occupancy</h4>
          <div className="chart-placeholder">
            <p>📈 Chart visualization will go here</p>
            <p className="text-sm">Consider using Chart.js or Recharts</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h4>Recent Activity</h4>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">✅</span>
            <div className="activity-content">
              <p>New billboard booking confirmed</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">📝</span>
            <div className="activity-content">
              <p>Campaign proposal submitted</p>
              <span className="activity-time">5 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <span className="activity-icon">💵</span>
            <div className="activity-content">
              <p>Payment received - $5,200</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
