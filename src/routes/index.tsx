import { createBrowserRouter, Outlet } from 'react-router-dom';
import AuthWrapper from '../components/Auth/AuthWrapper';
import Footer from '../components/Footer/Footer';
import AuthHeader from '../components/Headers/AuthHeader/AuthHeader';
import Header from '../components/Headers/Header/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Map from '../pages/Map';
import Profile from '../pages/Profile';
import Projects from '../pages/Projects';
import Registration from '../pages/Registration';
import Test from '../pages/Test';

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
      {
        path: '/test',
        element: <Test />,
      },
    ],
  },
  {
    path: '/map/:projectId',
    element: <Map />,
  },
]);
