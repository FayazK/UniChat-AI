import React from 'react';
import {
  Menu,
  Bot,
  Bell,
  Moon,
  Sun,
  Search
} from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <div className="h-14 border-b border-base-200 flex items-center px-3 bg-base-100">
      {/* Sidebar toggle and logo */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="btn btn-ghost btn-sm btn-circle mr-3"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2">
          <Bot className="text-primary" size={24} />
          <span className="font-bold text-lg tracking-tight">UniChat AI</span>
        </div>
      </div>

      {/* Right side actions */}
      <div className="ml-auto flex items-center gap-1">
        {/* Search button */}
        <button className="btn btn-ghost btn-sm btn-circle">
          <Search size={18} />
        </button>

        {/* Notifications */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
            <div className="indicator">
              <Bell size={18} />
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </label>
          <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-3">
            <li className="menu-title text-xs">Notifications</li>
            <li><a className="text-sm">New features available</a></li>
          </ul>
        </div>

        {/* Theme toggle */}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
