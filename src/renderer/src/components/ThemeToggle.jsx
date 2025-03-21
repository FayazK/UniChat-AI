import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * Theme toggle component that switches between light and dark mode
 * 
 * @param {object} props - Component props
 * @param {function} props.onChange - Optional callback when theme changes
 */
const ThemeToggle = ({ onChange }) => {
  const [theme, setTheme] = useState('light');

  // Initialize theme on component mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        // Try to get theme setting from the secure store
        const themeSetting = await window.api.settings.get('theme');
        let newTheme = 'light';
        
        if (themeSetting === 'dark') {
          newTheme = 'dark';
        } else if (themeSetting === 'system') {
          // Check system preference
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (systemPrefersDark) {
            newTheme = 'dark';
          }
        }
        
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    
    try {
      await window.api.settings.set('theme', newTheme);
      if (onChange) {
        onChange(newTheme);
      }
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;
