import React from 'react';
import { Menu, Settings, BellRing, Moon, Sun, Bot, Search } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useSidebar } from '../context/SidebarContext';

/**
 * Application navbar component with enhanced styling
 * 
 * @param {object} props - Component props
 * @param {string} props.title - Application title
 */
const Navbar = ({ title }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-4 h-16">
      <div className="flex-1">
        <button onClick={toggleSidebar} className="btn btn-ghost btn-circle mr-2 lg:hidden">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <Bot className="text-primary hidden sm:block" size={22} />
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
      </div>
      
      <div className="flex-none gap-1">
        {/* Search button */}
        <button className="btn btn-ghost btn-circle">
          <Search size={20} />
        </button>
        
        {/* Notifications */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <BellRing size={20} />
              <span className="badge badge-sm badge-primary indicator-item">2</span>
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li className="menu-title">Notifications</li>
            <li><a>New features available</a></li>
            <li><a>Update completed</a></li>
          </ul>
        </div>
        
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Settings Button */}
        <a href="/settings" className="btn btn-ghost btn-circle">
          <Settings size={20} />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
