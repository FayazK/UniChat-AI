import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  MessageSquare, 
  Plus, 
  Settings, 
  Trash, 
  Users,
  PanelLeft,
  History,
  Bot,
  Book,
  Search,
  User
} from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const location = useLocation();

  const mainNavItems = [
    { path: '/', label: 'Chat', icon: <MessageSquare size={20} /> },
    { path: '/history', label: 'History', icon: <History size={20} /> },
    { path: '/templates', label: 'Templates', icon: <Book size={20} /> },
  ];

  const utilityNavItems = [
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  // Mock recent chats data
  const recentChats = [
    { id: 1, title: "WordPress Log Plugins", date: "Today" },
    { id: 2, title: "Senior Solutions Architecture", date: "Yesterday" },
    { id: 3, title: "Java Gradle Incompatibility", date: "3 days ago" },
  ];

  return (
    <div
      className={`
        sidebar h-full bg-base-200 flex flex-col border-r border-base-300
        ${isOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}
      `}
    >
      {/* Logo and collapse button section */}
      <div className="flex items-center p-4 justify-between border-b border-base-300">
        {isOpen && (
          <div className="flex items-center gap-2">
            <Bot className="text-primary" size={22} />
            <span className="font-bold text-lg">UniChat</span>
          </div>
        )}
        {!isOpen && <Bot className="text-primary mx-auto" size={22} />}
        <button 
          onClick={toggleSidebar} 
          className="btn btn-sm btn-ghost btn-circle ml-auto text-base-content hover:bg-base-300"
          aria-label="Toggle sidebar"
        >
          <PanelLeft
            size={18}
            className={`transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}
          />
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          className={`
            btn btn-primary w-full shadow-md
            ${isOpen ? 'justify-start gap-2' : 'btn-square mx-auto'}
          `}
        >
          <Plus size={isOpen ? 16 : 18} />
          {isOpen && <span>New Chat</span>}
        </button>
      </div>

      {/* Search */}
      {isOpen && (
        <div className="px-3 pb-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="input input-sm input-bordered w-full pl-8" 
            />
            <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="px-2 pt-2">
        <ul className="menu menu-sm gap-1 rounded-md">
          {mainNavItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`
                  group flex items-center py-2 px-3 rounded-md
                  ${location.pathname === item.path ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-base-300'} 
                  ${isOpen ? '' : 'justify-center'}
                `}
              >
                <div className={location.pathname === item.path ? 'text-primary' : 'text-base-content/70'}>
                  {item.icon}
                </div>
                {isOpen && <span className="ml-2">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Recent Chats Section */}
      {isOpen && (
        <div className="mt-4 px-3 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-base-content/60 uppercase tracking-wider">Recent Chats</h3>
            <button className="btn btn-ghost btn-xs">
              <History size={12} />
            </button>
          </div>
          <ul className="space-y-1">
            {recentChats.map((chat) => (
              <li key={chat.id} className="group">
                <a className="flex py-2 px-3 text-sm rounded-md hover:bg-base-300">
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-medium">{chat.title}</p>
                    <p className="text-xs text-base-content/60">{chat.date}</p>
                  </div>
                  <button className="btn btn-ghost btn-xs btn-circle opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash size={14} />
                  </button>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Utility Navigation */}
      <div className="mt-auto border-t border-base-300">
        <ul className="menu menu-sm p-2">
          {utilityNavItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`
                  flex items-center py-2 rounded-md
                  ${location.pathname === item.path ? 'bg-base-300 font-medium' : 'hover:bg-base-300'} 
                  ${isOpen ? '' : 'justify-center'}
                `}
              >
                <div className="text-base-content/70">
                  {item.icon}
                </div>
                {isOpen && <span className="ml-2">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Profile */}
        <div className="p-2">
          <button
            className={`
              btn btn-ghost w-full justify-start rounded-md
              ${isOpen ? '' : 'justify-center'}
            `}
          >
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-8">
                <span>U</span>
              </div>
            </div>
            {isOpen && (
              <div className="ml-2 text-left">
                <p className="font-medium text-sm leading-none">User Name</p>
                <p className="text-xs text-base-content/60 mt-1">Free Plan</p>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
