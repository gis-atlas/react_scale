import classNames from 'classnames';
import { useState } from 'react';
import './index.sass';
import { useAppDispatch } from '../../../store';
import { removeLayer, loadLayer } from '../../../store/layer';
import { flyToLayer } from '../../../store/map';

const LayerCard = ({
  id,
  name,
  layerIconType,
  layerType,
  active = false,
}: ILayerCard) => {
  const dispatch = useAppDispatch();
  const [showed, setShowed] = useState<boolean>(active);
  const showLayer = async () => {
    await dispatch(loadLayer({ type: layerType, id: id }));
    setShowed(true);
  };
  const flyTo = async () => {
    if (!showed) {
      await showLayer();
    }
    dispatch(flyToLayer({ id, layerType }));
    console.log('the end');
  };
  const hideLayer = () => {
    setShowed(false);
    dispatch(removeLayer(id));
  };
  return (
    <div
      className={classNames('layer-card', {
        active: showed,
      })}
    >
      <div className='layer-card-title'>
        <div className={`type-${layerIconType} layer-card-type`}>
          <img src={`/images/icons/layers/${layerIconType}.svg`} alt='' />
        </div>
        <h6>{name || '!!! Без имени !!!'}</h6>
      </div>
      <div className='layer-card-controls'>
        <img src='/images/icons/layers/target.svg' alt='' onClick={flyTo} />
        {showed ? (
          <img src='/images/icons/layers/eye.svg' alt='' onClick={hideLayer} />
        ) : (
          <img
            src='/images/icons/layers/eye-closed.svg'
            alt=''
            onClick={showLayer}
          />
        )}
      </div>
    </div>
  );
};

export default LayerCard;
