import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiAlignRight, FiX } from "react-icons/fi";

interface NavItem {
  name: string;
  id: string;
}

const Navbar: React.FC = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => setNav(!nav);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setNav(false);
  };

  const location = useLocation();
  const navItems: NavItem[] = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Billboards', id: 'billboards' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-[#000300]/95 backdrop-blur-sm shadow-lg'>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
        <h1 
          onClick={() => scrollToSection('home')}
          className='text-full text-3xl font-bold text-[#25fcb8] cursor-pointer hover:text-[#128f67] transition-colors duration-300'
        >
          Billboard HQ .
        </h1>
        <ul className='hidden md:flex items-center'>
          {navItems.map(item => (
            <li
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className='p-4 cursor-pointer hover:text-[#25fcb8] transition-colors duration-300 font-medium'
            >
              {item.name}
            </li>
          ))}
          <li className='p-4'>
            <Link 
              to="/dashboard/login"
              className='bg-[#25fcb8] text-[#000300] px-6 py-2 rounded-full font-semibold hover:bg-[#1fdb9f] transition-all duration-300 hover:shadow-lg hover:shadow-[#25fcb8]/50'
            >
              Dashboard
            </Link>
          </li>
        </ul>
        <div onClick={handleNav} className='block md:hidden cursor-pointer text-2xl'>
          {nav ? <FiX /> : <FiAlignRight />}
        </div>
        <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-gray-900 bg-[#000300] ease-in-out duration-500 z-50' : 'fixed left-[-100%] top-0 w-[60%] h-full border-r border-gray-900 bg-[#000300] ease-in-out duration-500 z-50'}>
          <div className='flex justify-between items-center p-4 border-b border-gray-800'>
            <h1 className='text-full text-3xl font-bold text-[#25fcb8]'>Billboard HQ .</h1>
            <FiX onClick={handleNav} className='text-2xl cursor-pointer hover:text-[#25fcb8] transition-colors' />
          </div>
          <ul className='uppercase p-4 bg-[#000300]'>
            {navItems.map(item => (
              <li 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className='p-4 border-b border-gray-600 cursor-pointer hover:text-[#25fcb8] hover:bg-gray-900/50 transition-all duration-300'
              >
                {item.name}
              </li>
            ))}
            <li className='p-4 border-b border-gray-600'>
              <Link 
                to="/dashboard/login"
                onClick={() => setNav(false)}
                className='block bg-[#25fcb8] text-[#000300] px-6 py-3 rounded-full font-semibold text-center hover:bg-[#1fdb9f] transition-all duration-300'
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
