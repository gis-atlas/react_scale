import Button from '../../UI/Button/Button';
import './index.sass';

const MapControls = () => {
  return (
    <div className='map-controls'>
      <Button variant='circle' color='secondary'>
        <img src='/images/icons/map/loupe.svg' alt='' />
      </Button>
      <Button variant='circle' color='secondary'>
        <img src='/images/icons/map/ruler.svg' alt='' />
      </Button>
      <Button variant='circle' color='secondary'>
        <img src='/images/icons/map/pencil.svg' alt='' />
      </Button>
      <Button variant='circle' color='secondary'>
        2D
      </Button>
      <Button variant='circle' color='secondary'>
        <img src='/images/icons/map/notification.svg' alt='' />
      </Button>
    </div>
  );
};

export default MapControls;
