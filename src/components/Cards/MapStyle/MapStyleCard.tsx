import classNames from 'classnames';
import { useAppDispatch } from '../../../store';
import { setBaseLayer } from '../../../store/map';
import './index.sass';

interface IMapStyleCard {
  src?: string;
  style?: string;
  isActive?: boolean;
  baseLayer?: any;
}

const MapStyleCard = ({ src, isActive = false, baseLayer }: IMapStyleCard) => {
  const dispatch = useAppDispatch();
  const onChangeMapStyle = () => {
    dispatch(setBaseLayer(baseLayer));
  };
  return (
    <div
      className={classNames('map-view-card', {
        active: isActive,
      })}
      onClick={onChangeMapStyle}
    >
      <img src={src || '/images/icons/plus.svg'} alt='' />
      <h6>{baseLayer.title}</h6>
    </div>
  );
};

export default MapStyleCard;
