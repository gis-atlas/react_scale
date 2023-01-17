import { NavLink, useNavigate } from 'react-router-dom';
import UserImage from '../../UI/Image/UserImage';
import '../index.sass';
import classNames from 'classnames';
import { useState } from 'react';
import { logout } from '../../../store/user';
import { useAppDispatch } from '../../../store';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [opened, setOpened] = useState<boolean>(false);
  const goToHome = () => navigate('/');
  const goToProfile = () => navigate('/profile');
  const userLogout = () => {
    dispatch(logout());
  };
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
        <li
          className={classNames('user-image-header-container', {
            opened: opened,
          })}
        >
          <UserImage
            size='small'
            variant='bordered'
            figure='circle'
            className='user-image-header'
            onHeader
            onClick={() => setOpened((prev) => !prev)}
          />
          <ul>
            <li onClick={goToProfile}>Профиль</li>
            <li onClick={userLogout}>Выйти</li>
          </ul>
        </li>
      </ul>
    </header>
  );
};

export default Header;
