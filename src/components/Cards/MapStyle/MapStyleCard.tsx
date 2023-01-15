import classNames from 'classnames';
import { useAppDispatch } from '../../../store';
import { setMapData } from '../../../store/map';
import './index.sass';

interface IMapStyleCard {
  src?: string;
  style?: string;
  isActive?: boolean;
  data?: any;
}

const MapStyleCard = ({ src, isActive = false, data }: IMapStyleCard) => {
  console.log(isActive);
  const dispatch = useAppDispatch();

  const onSetMapView = () => {
    dispatch(setMapData(data));
  };

  return (
    <div
      className={classNames('map-view-card', {
        active: isActive,
      })}
      onClick={onSetMapView}
    >
      <img src={src || '/images/icons/plus.svg'} alt='' />
      <h6>{data.title}</h6>
    </div>
  );
};

export default MapStyleCard;
