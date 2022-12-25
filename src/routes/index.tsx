import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Registration from '../pages/Registration';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]);
