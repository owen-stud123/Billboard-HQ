import React from 'react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/dashboard/billboards', label: 'Billboards', icon: '🏢' },
  { to: '/dashboard/contracts', label: 'Contracts', icon: '📜' },
  { to: '/dashboard/bids', label: 'Bids', icon: '💬' },
  { to: '/dashboard/analytics', label: 'Analytics', icon: '📈' },
  { to: '/dashboard/profile', label: 'Profile', icon: '👤' },
];

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-blue-800 text-white flex flex-col justify-between shadow-lg">
      {/* --- Header --- */}
      <div>
        <div className="p-5 border-b border-blue-700">
          <h2 className="text-xl font-semibold">Billboard HQ</h2>
          <p className="text-sm opacity-75">Owner Dashboard</p>
        </div>

        {/* --- Search --- */}
        <div className="p-4">
          <input
            className="w-full rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search..."
          />
        </div>

        {/* --- Navigation --- */}
        <nav className="flex-1 overflow-y-auto px-2">
          <ul className="space-y-1">
            {items.map((i) => (
              <li key={i.to}>
                <NavLink
                  to={i.to}
                  className={({ isActive }) =>
                    isActive
                      ? 'flex items-center gap-3 px-3 py-2 rounded-md bg-blue-600'
                      : 'flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-700'
                  }
                >
                  <span className="text-lg">{i.icon}</span>
                  <span>{i.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* --- Footer --- */}
      <div className="p-4 border-t border-blue-700">
        <a className="block text-sm hover:text-blue-300" href="/">
          ← Back to site
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
