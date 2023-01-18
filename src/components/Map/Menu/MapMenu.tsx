import classNames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.sass';
import LayersTab from './Tabs/Layers/LayersTab';
import DataTab from './Tabs/Data/DataTab';
import PublicationTab from './Tabs/Publication/PublicationTab';
import Button from '../../UI/Button/Button';
import MapsTab from './Tabs/Maps/MapsTab';

interface IMapMenu {
  title: string;
  layerGroups: Array<any>;
  layers?: Array<any>;
}

const tabs = [
  { id: 1, title: 'Слои', name: 'layers' },
  { id: 2, title: 'Данные', name: 'data' },
  { id: 3, title: 'Карты', name: 'maps' },
  { id: 4, title: 'Публикация', name: 'publication' },
];

const MapMenu = ({ title, layerGroups, layers }: IMapMenu) => {
  const navigate = useNavigate();
  const goToOtherProjects = () => {
    navigate('/projects');
  };
  const [currentTab, setCurrentTab] = useState<string>(tabs[0].name);
  const [opened, setOpened] = useState<boolean>(true);

  return (
    <>
      {!opened && (
        <Button
          variant='circle'
          color='secondary'
          styles={{
            position: 'absolute',
            top: '36px',
            transform: 'rotate(180deg)',
            left: '10px',
            zIndex: 100,
          }}
          onClick={() => setOpened(true)}
        >
          <img src='/images/icons/map/chevron.svg' alt='' />
          <img src='/images/icons/map/chevron.svg' alt='' />
        </Button>
      )}
      <div
        className={classNames('map-menu', {
          opened: opened,
        })}
      >
        <div className='map-menu-controls'>
          <Button
            variant='circle'
            color='secondary'
            onClick={() => setOpened(false)}
          >
            <img src='/images/icons/map/chevron.svg' alt='' />
            <img src='/images/icons/map/chevron.svg' alt='' />
          </Button>
        </div>
        <div className='map-menu-title'>
          <div className='d-flex ai-c' style={{ gap: '7px' }}>
            <img src='/images/icons/logo.svg' alt='' />
            <h3>{title || 'Без имени'}</h3>
          </div>
          <Button variant='circle' color='secondary'>
            <img src='/images/icons/map/dots.svg' alt='' />
          </Button>
        </div>

        <div className='other-projects'>
          <img
            src='/images/icons/arrow.svg'
            alt=''
            onClick={goToOtherProjects}
          />
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
            <LayersTab layerGroups={layerGroups} layers={layers} />
          ) : currentTab === 'data' ? (
            <DataTab />
          ) : currentTab === 'maps' ? (
            <MapsTab />
          ) : (
            <PublicationTab />
          )}
        </div>
      </div>
    </>
  );
};

export default MapMenu;
