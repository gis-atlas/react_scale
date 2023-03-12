import classNames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import { disableEditMode, setDrawMode } from '../../../store/newMap';
import { modes } from '../../../store/newMap/mapConfig';
import { RootState } from '../../../store/reducer';
import { formatDatasetType } from '../../../utils';
import LayerTypeCard from '../../Cards/Layers/Type/LayerTypeCard';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import './index.sass';

const EditMapMenu = () => {
  const dispatch = useAppDispatch();
  const [opened, setOpened] = useState<boolean>(true);
  const selectedDrawMode = useSelector(
    (state: RootState) => state.newMap.mode.mode.name
  );

  const dataset = useSelector((state: RootState) => state.map.newDataset);
  
  const [isDatasetObjectsOpened, setDatasetObjectsOpened] =
    useState<boolean>(false);

  const closeEditMenu = () => {
    dispatch(disableEditMode());
  };
  const changeDrawMode = (mode: any) => {
    console.log(mode);
    if (selectedDrawMode === mode.name) {
      dispatch(setDrawMode(modes.view[0]));
    } else {
      dispatch(setDrawMode(mode));
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
            {modes.draw?.map(drawMode => (
              <LayerTypeCard
                key={drawMode.label}
                icon={drawMode.icon}
                name={drawMode.name}
                title={drawMode.label}
                selected={drawMode.name === selectedDrawMode}
                setSelected={() => changeDrawMode(drawMode)}
              />
            ))}
          </div>
        </div>
        <Select
          state={`Объекты датасета (${dataset?.features?.length})`}
          variant='text'
          triangle='closely'
          withoutBackground
          getSelectStatus={setDatasetObjectsOpened}
        />
        {isDatasetObjectsOpened && (
          <ul className='flex flex-col gap-2 ml-2'>
            {dataset?.features?.map((datasetItem: any) => (
              <>
                <li>{formatDatasetType(datasetItem.geometry.type)}</li>
              </>
            ))}
          </ul>
        )}
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
