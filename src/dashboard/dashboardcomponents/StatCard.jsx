import React from 'react';

const StatCard = ({ title, value, icon, trend, trendValue, color = 'blue' }) => {
  const colorClasses = {
    blue: 'stat-card-blue',
    green: 'stat-card-green',
    orange: 'stat-card-orange',
    red: 'stat-card-red',
  };

  return (
    <div className={`stat-card ${colorClasses[color]}`}>
      <div className="stat-header">
        <div className="stat-icon">{icon}</div>
        <div className="stat-content">
          <p className="stat-title">{title}</p>
          <h3 className="stat-value">{value}</h3>
        </div>
      </div>
      {trend && (
        <div className="stat-footer">
          <span className={`trend ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </span>
          <span className="trend-text">Since last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
