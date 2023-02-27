import classNames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import { closeSubMenu, openSubMenu } from '../../../store/map';
import { RootState } from '../../../store/reducer';
import UploadAPI from '../../../store/upload/api';
import Button from '../../UI/Button/Button';
import './index.sass';
import AddLayer from './SubMenu/Layers/AddLayer';
import DataTab from './Tabs/Data/DataTab';
import LayersTab from './Tabs/Layers/LayersTab';
import MapsTab from './Tabs/Maps/MapsTab';
import PublicationTab from './Tabs/Publication/PublicationTab';

interface IMapMenu {
  projectId: string | undefined;
  title: string;
  layerGroups: Array<any>;
}

const tabs = [
  { id: 1, title: 'Слои', name: 'layers' },
  { id: 2, title: 'Данные', name: 'data' },
  { id: 3, title: 'Карты', name: 'maps' },
  { id: 4, title: 'Публикация', name: 'publication' },
];

const MapMenu = ({ projectId, title, layerGroups }: IMapMenu) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const goToOtherProjects = () => {
    navigate('/projects');
  };
  const [currentTab, setCurrentTab] = useState<string>(tabs[0].name);
  const [opened, setOpened] = useState<boolean>(true);
  const subMenuName = useSelector((state: RootState) => state.map.subMenuName);
  const setSubMenuName = (name: string) => {
    dispatch(openSubMenu(name));
  };
  const uploadData = useSelector((state: RootState) => state.upload);
  const onSave = async () => {
    console.log(uploadData);
    await UploadAPI.publish(uploadData).then(response => {
      dispatch(closeSubMenu());
      console.log(response.data);
    });
  };

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
          {tabs.map(tab => (
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
            <LayersTab
              layerGroups={layerGroups}
              setSubMenuName={setSubMenuName}
            />
          ) : currentTab === 'data' ? (
            <DataTab />
          ) : currentTab === 'maps' ? (
            <MapsTab />
          ) : (
            <PublicationTab />
          )}
        </div>
        {subMenuName && (
          <div className='map-tabs-submenu'>
            {subMenuName === 'layers' ? (
              <AddLayer
                projectId={Number(projectId)}
                layerGroups={layerGroups}
              />
            ) : (
              <></>
            )}
            <Button
              variant='circle'
              color='secondary'
              className='close-button'
              onClick={() => {
                dispatch(closeSubMenu());
              }}
            >
              <img
                src='/images/icons/plus.svg'
                alt=''
                style={{
                  transform: 'rotate(45deg)',
                  width: '14px',
                  height: '14px',
                }}
              />
            </Button>
            <Button
              color='primary'
              size='large'
              styles={{ marginTop: '40px' }}
              onClick={onSave}
            >
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default MapMenu;
