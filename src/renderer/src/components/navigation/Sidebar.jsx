import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Wand2, 
  Library, 
  BookOpen, 
  Settings as SettingsIcon, 
  HelpCircle 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const menuItems = [
    {
      name: 'Home',
      icon: <Home size={20} />,
      path: '/home',
    },
    {
      name: 'Story Creator',
      icon: <Wand2 size={20} />,
      path: '/story-creator',
    },
    {
      name: 'Library',
      icon: <Library size={20} />,
      path: '/library',
    },
    {
      name: 'Reader',
      icon: <BookOpen size={20} />,
      path: '/reader',
    },
    {
      name: 'Settings',
      icon: <SettingsIcon size={20} />,
      path: '/settings',
    },
    {
      name: 'Help',
      icon: <HelpCircle size={20} />,
      path: '/help',
    },
  ];

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-800 h-full flex flex-col">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">StoryMagic</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg ${
                  path === item.path
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Version: 0.0.1
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
