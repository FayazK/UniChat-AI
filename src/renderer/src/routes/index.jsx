import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Import pages/layouts
import Settings from '../pages/Settings';

// Create and export the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/settings" replace />, // Default redirect to settings for now
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  // Add more routes as you build the application
  // {
  //   path: '/home',
  //   element: <Home />,
  // },
  // {
  //   path: '/story-creator',
  //   element: <StoryCreator />,
  // },
  // {
  //   path: '/story-editor/:id',
  //   element: <StoryEditor />,
  // },
  // {
  //   path: '/library',
  //   element: <Library />,
  // },
  // {
  //   path: '/reader/:id',
  //   element: <Reader />,
  // },
]);

export default router;
