import classNames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import { setDrawMode } from '../../../store/map';
import { mapBaseLayers } from '../../../store/map/baseLayers';
import { modes } from '../../../store/map/mapConfig';
import { RootState } from '../../../store/reducer';
import { formatDatasetType } from '../../../utils';
import DatasetCard from '../../Cards/Dataset/DatasetCard';
import LayerTypeCard from '../../Cards/Layers/Type/LayerTypeCard';
import MapStyleCard from '../../Cards/MapStyle/MapStyleCard';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import './index.sass';

const EditMapMenu = () => {
  const dispatch = useAppDispatch();
  const selectedDrawMode = useSelector(
    (state: RootState) => state.map.mode.mode.name
  );

  const [layersOpened, setLayersOpened] = useState<boolean>(false);
  const [mapStylesOpened, setMapStylesOpened] = useState<boolean>(false);

  const dataset = useSelector(
    (state: RootState) => state.map.data.createdDataset
  );

  const currentMapInfo: any = useSelector(
    (state: RootState) => state.map.layers.baseTile
  );

  const [isDatasetObjectsOpened, setDatasetObjectsOpened] =
    useState<boolean>(true);

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
      <div className='absolute left-7 top-8 flex gap-4'>
        <div className='relative'>
          <Select
            state='Слои'
            variant='contained'
            triangle='closely'
            getSelectStatus={setLayersOpened}
          />
          {layersOpened && (
            <ul className='absolute top-10 center z-10'>нет слоев</ul>
          )}
        </div>
        <div className='relative'>
          <Select
            state='Карты'
            variant='contained'
            triangle='closely'
            getSelectStatus={setMapStylesOpened}
          />
          {mapStylesOpened && (
            <ul className='absolute flex flex-col top-10 center z-10 gap-2'>
              {mapBaseLayers?.map((baseLayer: any) => (
                <MapStyleCard
                  key={baseLayer.layer.id}
                  baseLayer={baseLayer}
                  variant='comfortable'
                  isActive={currentMapInfo.layer.id === baseLayer.layer.id}
                  src={baseLayer.imageSrc}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={classNames('edit-menu', {})}>
        <div className='map-menu-title'>
          <div className='d-flex ai-c' style={{ gap: '12px' }}>
            <h4>Режим редактирования</h4>
          </div>
        </div>
        <div className='layer-type-choise'>
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
          selectStatus={isDatasetObjectsOpened}
          getSelectStatus={setDatasetObjectsOpened}
        />
        {isDatasetObjectsOpened && (
          <ul className='dataset-list flex flex-col gap-2 ml-2'>
            {dataset.features?.length ? (
              <>
                {dataset.features?.map((datasetItem: any, index: number) => (
                  <>
                    <li>
                      <DatasetCard
                        key={index}
                        id={index}
                        datasetItem={datasetItem}
                        selected={false}
                      />
                    </li>
                  </>
                ))}
              </>
            ) : (
              <li className='text-sm font-bold'>
                Вы не добавили ни одного объекта
              </li>
            )}
          </ul>
        )}
        <div className='flex gap-2 mt-6'>
          <Button color='secondary'>Выйти</Button>
          <Button color='primary'>Сохранить</Button>
        </div>
      </div>
    </>
  );
};

export default EditMapMenu;
