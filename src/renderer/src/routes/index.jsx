import { createBrowserRouter } from 'react-router-dom';

// Import pages/layouts
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import MainLayout from '../layouts/MainLayout';

// Create placeholder components for new pages
const HistoryPage = () => (
  <div className="container mx-auto p-4 bg-base-100 rounded-lg shadow-sm">
    <h1 className="text-2xl font-bold mb-4">Chat History</h1>
    <div className="alert alert-info">
      <p>This page is under development. Chat history will be displayed here.</p>
    </div>
  </div>
);

const TemplatesPage = () => (
  <div className="container mx-auto p-4 bg-base-100 rounded-lg shadow-sm">
    <h1 className="text-2xl font-bold mb-4">Templates</h1>
    <div className="alert alert-info">
      <p>This page is under development. Chat templates will be displayed here.</p>
    </div>
  </div>
);

// Create and export the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'history',
        element: <HistoryPage />
      },
      {
        path: 'templates',
        element: <TemplatesPage />
      }
    ]
  }
]);

export default router;
