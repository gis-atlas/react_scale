import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.sass';

interface IMenu {
  title: string;
}

const tabs = [
  { id: 1, title: 'Слои', name: 'layers' },
  { id: 2, title: 'Данные', name: 'data' },
  { id: 3, title: 'Карты', name: 'maps' },
  { id: 4, title: 'Публикация', name: 'publication' },
];

const Menu = ({ title }: IMenu) => {
  const navigate = useNavigate();
  const goToOtherProjects = () => {
    navigate('/projects');
  };
  const [currentTab, setCurrentTab] = useState<string>(tabs[0].name);

  return (
    <div className='map-menu'>
      <div className='map-menu-title'>
        <img src='/images/icons/logo.svg' alt='' />
        <h3>{title}</h3>
      </div>
      <div className='other-projects'>
        <img src='/images/icons/arrow.svg' alt='' onClick={goToOtherProjects} />
        <span onClick={goToOtherProjects}>К другим проектам</span>
      </div>
      <ul className='map-tabs-control'>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => setCurrentTab(tab.name)}
            className={classNames({
              active: currentTab === tab.name,
            })}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      <div className='map-tabs'>
        {currentTab === 'layers' ? (
          <div>Слои</div>
        ) : currentTab === 'data' ? (
          <div>Данные</div>
        ) : currentTab === 'maps' ? (
          <div>Карты</div>
        ) : (
          <div>Публикация</div>
        )}
      </div>
    </div>
  );
};

export default Menu;
