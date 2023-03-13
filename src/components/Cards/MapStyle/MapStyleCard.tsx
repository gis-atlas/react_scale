import classNames from 'classnames';
import { useAppDispatch } from '../../../store';
import { setBaseTile } from '../../../store/map';
import './index.sass';

interface IMapStyleCard {
  src?: string;
  isActive?: boolean;
  baseLayer?: any;
  variant?: 'default' | 'comfortable';
}

const MapStyleCard = ({
  src,
  isActive = false,
  baseLayer,
  variant = 'default',
}: IMapStyleCard) => {
  const dispatch = useAppDispatch();
  const onChangeMapStyle = () => {
    dispatch(setBaseTile(baseLayer));
  };
  return (
    <div
      className={classNames('map-view-card', {
        active: isActive,
        [`${variant}`]: variant,
      })}
      onClick={onChangeMapStyle}
    >
      <img src={src || '/images/icons/plus.svg'} alt='' />
      <h6>{variant === 'comfortable' ? baseLayer.abbr : baseLayer.title}</h6>
    </div>
  );
};

export default MapStyleCard;
