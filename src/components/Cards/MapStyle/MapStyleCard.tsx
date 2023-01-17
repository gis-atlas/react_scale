import classNames from 'classnames';
import { useAppDispatch } from '../../../store';
import { setLayer } from '../../../store/map';
import './index.sass';

interface IMapStyleCard {
  src?: string;
  style?: string;
  isActive?: boolean;
  layer?: any;
}

const MapStyleCard = ({ src, isActive = false, layer }: IMapStyleCard) => {
  console.log(isActive);
  const dispatch = useAppDispatch();

  const onSetMapView = () => {
    dispatch(setLayer(layer));
  };

  return (
    <div
      className={classNames('map-view-card', {
        active: isActive,
      })}
      onClick={onSetMapView}
    >
      <img src={src || '/images/icons/plus.svg'} alt='' />
      <h6>{layer.name}</h6>
    </div>
  );
};

export default MapStyleCard;
