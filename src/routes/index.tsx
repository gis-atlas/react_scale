import { createBrowserRouter, Outlet } from 'react-router-dom';
import Header from '../components/Headers/Header/Header';
import AuthHeader from '../components/Headers/AuthHeader/AuthHeader';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Projects from '../pages/Projects';
import Registration from '../pages/Registration';
import Test from '../pages/Test';
import Footer from '../components/Footer/Footer';

export const router = createBrowserRouter([
  {
    element: (
      <>
        <Header />
        <main>
          <div className='content'>
            <Outlet />
          </div>
        </main>
        <Footer />
      </>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/catalog',
        element: <div>Каталог</div>,
      },
      {
        path: '/test',
        element: <Test />,
      },
    ],
  },
  {
    element: (
      <>
        <AuthHeader />
        <main>
          <div className='content'>
            <Outlet />
          </div>
        </main>
        <Footer />
      </>
    ),
    children: [
      {
        path: '/registration',
        element: <Registration />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);
