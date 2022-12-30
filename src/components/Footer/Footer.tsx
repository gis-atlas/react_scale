import './index.sass';

const Footer = () => {
  return (
    <footer>
      <small className='signature'>&copy; 2022 GIS Atlas</small>
      <ul className='policy'>
        <li>Лицензионное соглашение</li>
        <li>Политика конфидециальности</li>
      </ul>
    </footer>
  );
};

export default Footer;
