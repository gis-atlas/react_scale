import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/reducer';
import MapViewCard from '../../../../Cards/MapStyle/MapStyleCard';
import Button from '../../../../UI/Button/Button';
import Input from '../../../../UI/Input/Input';
import './index.sass';

const MapsTab = () => {
  return (
    <div className='tab tab-maps'>
      <div className='d-flex jc-sb ai-c'>
        <h4>Добавить новую карту</h4>
        <Button color='secondary' variant='circle' size='small'>
          <img src='/images/icons/plus.svg' alt=' ' />
        </Button>
      </div>
      <Input prevIcon='/images/icons/loupe.svg' placeholder='поиск по картам' />
      <ul className='tab-list'></ul>
    </div>
  );
};

export default MapsTab;
