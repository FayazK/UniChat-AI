import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  PlusCircle,
  FolderPlus,
  ChevronDown,
  ChevronRight,
  Settings,
  LogOut,
  MessageSquare,
  User
} from 'lucide-react'
import { useSidebar } from '../../context/SidebarContext'

const Sidebar = () => {
  const { isOpen } = useSidebar()
  const location = useLocation()
  const [showAllProjects, setShowAllProjects] = useState(false)

  // Mock projects data
  const recentProjects = [
    { id: 1, title: 'Website Redesign', path: '/projects/1' },
    { id: 2, title: 'Mobile App', path: '/projects/2' },
    { id: 3, title: 'E-commerce Platform', path: '/projects/3' },
    { id: 4, title: 'Portfolio Site', path: '/projects/4' }
  ]

  // Mock conversations data
  const conversations = [
    { id: 1, title: 'AI Art Generation', path: '/chat/1' },
    { id: 2, title: 'Code Optimization', path: '/chat/2' },
    { id: 3, title: 'Learning React', path: '/chat/3' }
  ]

  // User data
  const user = {
    name: 'User Name',
    email: 'user@example.com',
    avatar: 'U'
  }

  return (
    <div
      className={`
        h-full bg-base-100 flex flex-col border-r border-base-200 transition-all duration-300
        ${isOpen ? 'w-64' : 'w-0'}
      `}
    >
      {isOpen && (
        <>
          {/* Top action buttons */}
          <div className="px-3 py-4 space-y-2">
            <button className="btn btn-primary w-full justify-start gap-2">
              <PlusCircle size={18} />
              <span>New Chat</span>
            </button>

            <button className="btn btn-outline btn-neutral w-full justify-start gap-2">
              <FolderPlus size={18} />
              <span>New Project</span>
            </button>
          </div>

          {/* Divider */}
          <div className="divider my-1 px-3"></div>

          {/* Projects section */}
          <div className="px-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-sm">Recent Projects</h3>
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="btn btn-ghost btn-xs"
              >
                {showAllProjects ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>

            <ul className="menu menu-sm p-0 gap-1">
              {recentProjects
                .slice(0, showAllProjects ? recentProjects.length : 4)
                .map((project) => (
                  <li key={project.id}>
                    <Link
                      to={project.path}
                      className={`py-2 px-3 rounded-md ${
                        location.pathname === project.path ? 'bg-base-200 font-medium' : ''
                      }`}
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}

              {!showAllProjects && recentProjects.length > 4 && (
                <li>
                  <button
                    onClick={() => setShowAllProjects(true)}
                    className="text-primary text-sm font-medium py-1"
                  >
                    Show all projects
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Divider */}
          <div className="divider my-1 px-3"></div>

          {/* Conversations section */}
          <div className="px-3 flex-1 overflow-y-auto">
            <h3 className="font-medium text-sm mb-2">Conversations</h3>
            <ul className="menu menu-sm p-0 gap-1">
              {conversations.map((conversation) => (
                <li key={conversation.id}>
                  <Link
                    to={conversation.path}
                    className={`py-2 px-3 rounded-md flex items-center gap-2 ${
                      location.pathname === conversation.path ? 'bg-base-200 font-medium' : ''
                    }`}
                  >
                    <MessageSquare size={16} />
                    <span className="truncate">{conversation.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* User profile section */}
          <div className="mt-auto p-3 border-t border-base-200">
            <div className="dropdown dropdown-top dropdown-end w-full">
              <label
                tabIndex={0}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-base-200 cursor-pointer w-full"
              >
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content w-9 rounded-full">
                    <span>{user.avatar}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{user.name}</p>
                  <p className="text-xs text-base-content/70 truncate">{user.email}</p>
                </div>
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-52 p-2 mt-1"
              >
                <li>
                  <Link to="/settings" className="gap-2">
                    <Settings size={16} />
                    Settings
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="gap-2">
                    <User size={16} />
                    Profile
                  </Link>
                </li>
                <li>
                  <button className="gap-2 text-error">
                    <LogOut size={16} />
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Sidebar
