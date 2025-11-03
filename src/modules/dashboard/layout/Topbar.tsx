import React from 'react';
import { useNavigate } from 'react-router-dom';

const Topbar: React.FC = () => {
  const userRaw = localStorage.getItem('user');
  const user = userRaw ? JSON.parse(userRaw) : { name: 'Owner' };
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/dashboard/login');
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <div className="font-semibold text-gray-800 text-lg">Dashboard</div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-700">{user.name}</div>
        <button
          onClick={logout}
          className="px-3 py-1.5 rounded bg-green-700 text-white hover:bg-green-800 text-sm transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
