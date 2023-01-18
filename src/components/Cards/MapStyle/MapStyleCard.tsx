import classNames from 'classnames';
import { useAppDispatch } from '../../../store';
import './index.sass';

interface IMapStyleCard {
  src?: string;
  style?: string;
  isActive?: boolean;
  layer?: any;
}

const MapStyleCard = ({ src, isActive = false, layer }: IMapStyleCard) => {
  return (
    <div
      className={classNames('map-view-card', {
        active: isActive,
      })}
    >
      <img src={src || '/images/icons/plus.svg'} alt='' />
      <h6>{layer.name}</h6>
    </div>
  );
};

export default MapStyleCard;
