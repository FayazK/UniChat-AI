import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar } from '../components';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';
import { AlertCircle } from 'lucide-react';

// MainLayout content component
const MainLayoutContent = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  
  // Effect to handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isOpen) {
        // Close sidebar on small screens when navigating
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
    <div className="drawer lg:drawer-open">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" checked={isOpen} readOnly />
      
      <div className="drawer-content flex flex-col">
        {/* Header */}
        <Navbar title="UniChat AI" />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-base-200/30 transition-all duration-300">
          {/* App update notification example */}
          <div className="w-full p-2">
            <div className="alert alert-info shadow-sm max-w-5xl mx-auto">
              <AlertCircle className="h-5 w-5" />
              <div className="flex justify-between w-full items-center">
                <span>New version available! Upgrade for new features.</span>
                <button className="btn btn-sm btn-ghost">Update</button>
              </div>
            </div>
          </div>

          <div className="p-2 md:p-4">
            <Outlet />
          </div>
          
          {/* Mobile overlay for sidebar */}
          {isOpen && (
            <label 
              htmlFor="main-drawer" 
              className="drawer-overlay lg:hidden" 
              onClick={toggleSidebar}
            ></label>
          )}
        </main>
      </div>
      
      {/* Sidebar area */}
      <div className="drawer-side z-40">
        <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <Sidebar />
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
