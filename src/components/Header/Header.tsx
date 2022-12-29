import { NavLink, useNavigate } from 'react-router-dom';
import './index.sass';

const Header = () => {
  const navigate = useNavigate();
  const goToHome = () => navigate('/');
  return (
    <header>
      <div className='logo'>
        <img src='/images/logo-icon.svg' alt='' onClick={goToHome} />
        <span onClick={goToHome}>Viewer</span>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Главная</NavLink>
          </li>
          <li>
            <NavLink to='/projects'>Проекты</NavLink>
          </li>
          <li>
            <NavLink to='/catalog'>Каталог данных</NavLink>
          </li>
        </ul>
      </nav>
      <div>asdsad</div>
    </header>
  );
};

export default Header;
