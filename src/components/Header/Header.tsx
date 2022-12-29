import { NavLink } from 'react-router-dom';
import './index.sass';

const Header = () => {
  return (
    <header>
      <div className='logo'>
        <img src='' alt='' />
        <span>Viewer</span>
      </div>
      <nav>
        <ul>
          <li>{/* <NavLink to='/'>Главная</NavLink> */}</li>
          <li>{/* <NavLink to='/projects'>Проекты</NavLink> */}</li>
          <li>
            <NavLink to='/catalog'>Каталог</NavLink>
          </li>
        </ul>
      </nav>
      <div>asdsad</div>
    </header>
  );
};

export default Header;
