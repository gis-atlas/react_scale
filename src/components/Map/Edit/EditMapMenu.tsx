import classNames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import { disableEditMode, setDrawMode } from '../../../store/map';
import { RootState } from '../../../store/reducer';
import LayerTypeCard from '../../Cards/Layers/Type/LayerTypeCard';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import { drawModes } from './drawModes';
import './index.sass';

const EditMapMenu = () => {
  const dispatch = useAppDispatch();
  const [opened, setOpened] = useState<boolean>(true);
  const selectedDrawMode = useSelector(
    (state: RootState) => state.map.drawMode
  );

  const closeEditMenu = () => {
    dispatch(disableEditMode());
  };
  const changeDrawMode = (name: string) => {
    if (selectedDrawMode === name) {
      dispatch(setDrawMode(''));
    } else {
      dispatch(setDrawMode(name));
    }
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
            {drawModes.map(drawMode => (
              <LayerTypeCard
                key={drawMode.id}
                icon={drawMode.icon}
                name={drawMode.name}
                title={drawMode.title}
                selected={selectedDrawMode === drawMode.name}
                setSelected={changeDrawMode}
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
