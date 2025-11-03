import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaImage, 
  FaFileContract, 
  FaGavel, 
  FaUser,
  FaHome
} from 'react-icons/fa';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt className="w-5 h-5" /> },
  { to: '/dashboard/billboards', label: 'Billboards', icon: <FaImage className="w-5 h-5" /> },
  { to: '/dashboard/contracts', label: 'Contracts', icon: <FaFileContract className="w-5 h-5" /> },
  { to: '/dashboard/bids', label: 'Bids', icon: <FaGavel className="w-5 h-5" /> },
  { to: '/dashboard/profile', label: 'Profile', icon: <FaUser className="w-5 h-5" /> },
];

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-emerald-700 text-white flex flex-col justify-between shadow-lg">
      {/* --- Header --- */}
      <div>
        <div className="p-5 border-b border-emerald-700">
          <h2 className="text-xl font-semibold">Billboard HQ</h2>
          <p className="text-sm opacity-75">Owner Dashboard</p>
        </div>

        {/* --- Search --- */}
        <div className="p-4">
          <input
            className="w-full rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
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
                      ? 'flex items-center gap-3 px-3 py-2 rounded-md bg-emerald-900'
                      : 'flex items-center gap-3 px-3 py-2 rounded-md hover:bg-emerald-900'
                  }
                >
                  <div className="text-white/80 group-hover:text-white transition-colors">
                    {i.icon}
                  </div>
                  <span>{i.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* --- Footer --- */}
      <div className="p-4 border-t border-green-800">
        <a className="block text-sm hover:text-green-300" href="/">
          ← Back to site
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
