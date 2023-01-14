import { NavLink, useNavigate } from 'react-router-dom';
import UserImage from '../../UI/Image/UserImage';
import '../index.sass';

const Header = () => {
  const navigate = useNavigate();
  const goToHome = () => navigate('/');
  return (
    <header>
      <div className='logo'>
        <img src='/images/icons/logo.svg' alt='' onClick={goToHome} />
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
      <ul className='d-flex ai-c' style={{ gap: '19px' }}>
        <li className='lang'>RU</li>
        <li>
          <UserImage size='small' variant='bordered' figure='circle' className='user-image-header' />
        </li>
      </ul>
    </header>
  );
};

export default Header;
