import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../index.sass';

const AuthHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const goToHome = () => navigate('/');
  return (
    <header className='auth'>
      <div className='logo'>
        <img src='/images/icons/logo.svg' alt='' onClick={goToHome} />
        <span onClick={goToHome}>Viewer</span>
      </div>
      <nav>
        <ul>
          <li className='lang'>RU</li>
          <li>
            {location.pathname === '/login' ? (
              <NavLink to='/registration'>Регистрация</NavLink>
            ) : (
              <NavLink to='/login'>Войти</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AuthHeader;
