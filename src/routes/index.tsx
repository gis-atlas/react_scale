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
import Map from '../pages/Map';
import AuthWrapper from '../components/Auth/AuthWrapper';

export const router = createBrowserRouter([
  {
    element: (
      <AuthWrapper>
        <Header />
        <main>
          <div className='content'>
            <Outlet />
          </div>
        </main>
        <Footer />
      </AuthWrapper>
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
        path: '/projects/:projectId',
        element: <div>Project</div>,
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
  {
    path: '/map/:projectId',
    element: <Map />,
  },
]);
