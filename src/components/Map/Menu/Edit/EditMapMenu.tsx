import { useState } from 'react';
import Button from '../../../UI/Button/Button';
import classNames from 'classnames';
import Input from '../../../UI/Input/Input';
import LayerTypeCard from '../../../Cards/Layers/Type/LayerTypeCard';
import '../index.sass';
import './index.sass';
import Select from '../../../UI/Select/Select';
import { useAppDispatch } from '../../../../store';
import { disableEditMode } from '../../../../store/map';

const layerTypes = [
  {
    id: 1,
    name: 'dots',
    title: 'Точки',
    icon: '/images/icons/layers/dots.svg',
  },
  {
    id: 2,
    name: 'lines',
    title: 'Линии',
    icon: '/images/icons/layers/lines.svg',
  },
  {
    id: 3,
    name: 'polygons',
    title: 'Полигоны',
    icon: '/images/icons/layers/polygons.svg',
  },
];

const EditMapMenu = () => {
  const dispatch = useAppDispatch();
  const [opened, setOpened] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>('');
  const closeEditMenu = () => {
    dispatch(disableEditMode());
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
        className={classNames('map-menu edit-menu', {
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
          <div className='d-flex ai-c' style={{ gap: '12px' }}>
            <img src='/images/icons/arrow.svg' alt='' onClick={closeEditMenu} />
            <h4>Режим редактирования</h4>
          </div>
        </div>
        <Input
          label='Имя датасета'
          name='datasetName'
          className='dataset-name'
        />
        <div className='layer-type-choise'>
          <h5>Создать</h5>
          <div className='layer-type-choise-list'>
            {layerTypes.map((layerType) => (
              <LayerTypeCard
                icon={layerType.icon}
                name={layerType.name}
                title={layerType.title}
                selected={selectedType === layerType.name}
                setSelected={setSelectedType}
              />
            ))}
          </div>
        </div>
        <Select
          state='Объекты датасета'
          variant='text'
          triangle='closely'
          withoutBackground
        />
        <Select
          state='Слои'
          variant='text'
          triangle='closely'
          withoutBackground
        />
        <Select
          state='Карты'
          variant='text'
          triangle='closely'
          withoutBackground
        />
      </div>
    </>
  );
};

export default EditMapMenu;
