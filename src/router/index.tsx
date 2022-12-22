import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <div>Profile</div>,
  },
]);
