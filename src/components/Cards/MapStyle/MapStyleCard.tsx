import classNames from 'classnames';
import { useAppDispatch } from '../../../store';
import './index.sass';
import { setMapInfo } from '../../../store/map';

interface IMapStyleCard {
  src?: string;
  style?: string;
  isActive?: boolean;
  mapInfo?: any;
}

const MapStyleCard = ({ src, isActive = false, mapInfo }: IMapStyleCard) => {
  const dispatch = useAppDispatch();
  const onChangeMapStyle = () => {
    dispatch(setMapInfo(mapInfo));
  };
  return (
    <div
      className={classNames('map-view-card', {
        active: isActive,
      })}
      onClick={onChangeMapStyle}
    >
      <img src={src || '/images/icons/plus.svg'} alt='' />
      <h6>{mapInfo.title}</h6>
    </div>
  );
};

export default MapStyleCard;
