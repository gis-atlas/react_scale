import classNames from 'classnames';
import { useAppDispatch } from '../../../store';
import { setMapStyle } from '../../../store/map';
import './index.sass';

interface IMapStyleCard {
  title?: string;
  src?: string;
  style?: string;
  isActive?: boolean;
}

const MapStyleCard = ({
  title,
  src,
  style,
  isActive = false,
}: IMapStyleCard) => {
  console.log(isActive);
  const dispatch = useAppDispatch();

  const onSetMapView = () => {
    dispatch(setMapStyle(style));
  };

  return (
    <div
      className={classNames('map-view-card', {
        active: isActive,
      })}
      onClick={onSetMapView}
    >
      <img src={src || '/images/icons/plus.svg'} alt='' />
      <h6>{title}</h6>
    </div>
  );
};

export default MapStyleCard;
