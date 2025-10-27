import React from 'react';
import DashboardHeader from '../dashboardcomponents/DashboardHeader';

const Tables = () => {
  const billboardData = [
    { id: 1, location: 'Downtown Plaza', status: 'Active', revenue: '$12,500', client: 'Tech Corp' },
    { id: 2, location: 'Highway 101', status: 'Active', revenue: '$8,200', client: 'Fashion Brand' },
    { id: 3, location: 'Shopping Mall', status: 'Pending', revenue: '$6,800', client: 'Food Co' },
    { id: 4, location: 'Airport Terminal', status: 'Active', revenue: '$15,000', client: 'Travel Inc' },
    { id: 5, location: 'Sports Arena', status: 'Inactive', revenue: '$0', client: 'N/A' },
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'Active': return 'status-active';
      case 'Pending': return 'status-pending';
      case 'Inactive': return 'status-inactive';
      default: return '';
    }
  };

  return (
    <div className="dashboard-content">
      <DashboardHeader title="Billboard Tables" />
      
      <div className="table-container">
        <div className="table-header">
          <h4>Billboard Inventory</h4>
          <button className="add-btn">+ Add Billboard</button>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Location</th>
                <th>Status</th>
                <th>Revenue</th>
                <th>Client</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {billboardData.map((billboard) => (
                <tr key={billboard.id}>
                  <td>{billboard.id}</td>
                  <td>{billboard.location}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(billboard.status)}`}>
                      {billboard.status}
                    </span>
                  </td>
                  <td>{billboard.revenue}</td>
                  <td>{billboard.client}</td>
                  <td>
                    <button className="action-btn">Edit</button>
                    <button className="action-btn">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tables;
