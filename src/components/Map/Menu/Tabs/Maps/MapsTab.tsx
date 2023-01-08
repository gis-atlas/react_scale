import { useSelector } from 'react-redux';
import MapViewCard from '../../../../Cards/MapStyle/MapStyleCard';
import Button from '../../../../UI/Button/Button';
import Input from '../../../../UI/Input/Input';
import { mapStyles } from './mapStyles';
import { RootState } from '../../../../../store/reducer';
import './index.sass';

const MapsTab = () => {
  const currentMapStyle = useSelector((state: RootState) => state.map.mapStyle);
  return (
    <div className='tab tab-maps'>
      <div className='d-flex jc-sb ai-c'>
        <h4>Добавить новую карту</h4>
        <Button color='secondary' variant='circle' size='small'>
          <img src='/images/icons/plus.svg' alt='' />
        </Button>
      </div>
      <Input prevIcon='/images/icons/loupe.svg' placeholder='поиск по картам' />
      <ul className='tab-list'>
        {mapStyles.map((mapStyle: any) => (
          <MapViewCard
            key={mapStyle.id}
            style={mapStyle.url}
            src={mapStyle.src}
            title={mapStyle.name}
            isActive={mapStyle.url === currentMapStyle}
          />
        ))}
      </ul>
    </div>
  );
};

export default MapsTab;
