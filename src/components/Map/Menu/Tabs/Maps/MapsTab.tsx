import { useSelector } from 'react-redux';
import { mapBaseLayers } from '../../../../../data/baselayers';
import { RootState } from '../../../../../store/reducer';
import MapViewCard from '../../../../Cards/MapStyle/MapStyleCard';
import Button from '../../../../UI/Button/Button';
import Input from '../../../../UI/Input/Input';
import './index.sass';

const MapsTab = () => {
  const currentMapInfo: any = useSelector(
    (state: RootState) => state.map.layers.baseTile
  );
  return (
    <div className='tab tab-maps'>
      <div className='d-flex jc-sb ai-c'>
        <h4>Добавить новую карту</h4>
        <Button color='secondary' variant='circle' size='small'>
          <img src='/images/icons/plus.svg' alt=' ' />
        </Button>
      </div>
      <Input prevIcon='/images/icons/loupe.svg' placeholder='поиск по картам' />
      <ul className='tab-list'>
        {mapBaseLayers?.map((baseLayer: any) => (
          <MapViewCard
            key={baseLayer.layer.id}
            baseLayer={baseLayer}
            isActive={currentMapInfo.layer.id === baseLayer.layer.id}
            src={baseLayer.imageSrc}
          />
        ))}
      </ul>
    </div>
  );
};

export default MapsTab;
