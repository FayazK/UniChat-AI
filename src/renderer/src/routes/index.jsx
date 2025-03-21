import { createBrowserRouter } from 'react-router-dom'

// Import pages/layouts
import Home from '../pages/Home'

// Create and export the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home /> // Now the home page is the main chat interface
  }
])

export default router
