import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Navbar } from './components'
import router from './routes'

function App() {
  // Effect to apply theme on startup based on settings
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        // Try to get theme setting from the secure store
        const themeSetting = await window.api.settings.get('theme')

        if (themeSetting === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark')
        } else if (themeSetting === 'system') {
          // Check system preference
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          if (systemPrefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark')
          }
        }
      } catch (error) {
        console.error('Error loading theme preference:', error)
      }
    }

    loadThemePreference()
  }, [])

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Navbar title="UniChat AI" />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden p-4">
        <RouterProvider router={router} />
      </main>
    </div>
  )
}

export default App
