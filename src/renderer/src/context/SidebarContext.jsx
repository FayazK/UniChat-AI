import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext(undefined);

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
