import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';
import { AlertCircle } from 'lucide-react';

// MainLayout content component
const MainLayoutContent = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  // Effect to handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <div className="h-screen flex flex-col bg-base-100">
      {/* Header */}
      <Navbar />

      {/* Main content with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto bg-base-50 p-0">
            {/* App update notification */}
            <div className="w-full p-3">
              <div className="alert bg-blue-50 text-blue-700 shadow-sm max-w-3xl mx-auto flex items-center">
                <AlertCircle className="h-5 w-5" />
                <div className="flex justify-between w-full items-center">
                  <span className="text-sm">New version available! Upgrade for new features.</span>
                  <button className="btn btn-sm bg-blue-100 hover:bg-blue-200 border-none text-blue-700">
                    Update
                  </button>
                </div>
              </div>
            </div>

            {/* Router outlet */}
            <div className="p-3">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Mobile overlay for sidebar */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            onClick={toggleSidebar}
            aria-hidden="true"
          ></div>
        )}
      </div>
    </div>
  );
};

// Main layout wrapper with context provider
const MainLayout = () => {
  return (
    <SidebarProvider>
      <MainLayoutContent />
    </SidebarProvider>
  );
};

export default MainLayout;
