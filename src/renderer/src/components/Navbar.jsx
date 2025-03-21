import React from 'react';
import { Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

/**
 * Application navbar component
 * 
 * @param {object} props - Component props
 * @param {string} props.title - Application title
 */
const Navbar = ({ title }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{title}</a>
      </div>
      <div className="flex-none">
        <ThemeToggle />
        <a href="/settings" className="btn btn-ghost btn-circle">
          <Settings size={20} />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
