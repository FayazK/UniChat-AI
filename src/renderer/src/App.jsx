import { useState, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Sun, Moon, Settings } from 'lucide-react'
import router from './routes'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  // Effect to apply dark mode on startup based on settings
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        // Try to get theme setting from the secure store
        const themeSetting = await window.api.settings.get('theme');
        
        if (themeSetting === 'dark') {
          setDarkMode(true);
          document.documentElement.classList.add('dark');
        } else if (themeSetting === 'system') {
          // Check system preference
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setDarkMode(systemPrefersDark);
          if (systemPrefersDark) {
            document.documentElement.classList.add('dark');
          }
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };

    loadThemePreference();
  }, []);

  // Save theme preference when it changes
  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark');
    
    // Save preference to settings
    try {
      await window.api.settings.set('theme', newDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  }

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <h1 className="text-lg font-medium text-gray-800 dark:text-white">StoryMagic</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => window.location.href = '/settings'}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden bg-white dark:bg-gray-900">
        <RouterProvider router={router} />
      </main>
    </div>
  )
}

export default App
