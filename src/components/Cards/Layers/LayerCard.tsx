import classNames from 'classnames';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import { loadLayer } from '../../../store/layer';
import { flyToLayer, hideLayer, setSelectedLayer } from '../../../store/map';
import { RootState } from '../../../store/reducer';
import './index.sass';

const LayerCard = ({
  id,
  name,
  layerIconType,
  layerType,
  active = false,
  inGroup = false,
}: ILayerCard) => {
  const dispatch = useAppDispatch();
  const [showed, setShowed] = useState<boolean>(active);
  const {
    user: { selectedLayer },
  } = useSelector((state: RootState) => state.map);
  const showLayer = async () => {
    await dispatch(loadLayer({ type: layerType, id: id }));
    setShowed(true);
  };
  const flyTo = async () => {
    if (!showed) {
      await showLayer();
    }
    dispatch(flyToLayer({ id }));
  };
  const removeLayer = () => {
    setShowed(false);
    dispatch(hideLayer(id));
  };
  const openLayerMenu = () => {
    dispatch(setSelectedLayer({ id, name }));
  };

  useEffect(() => {
    console.log(selectedLayer.id, selectedLayer.status);
  }, [selectedLayer]);

  return (
    <div
      className={classNames('layer-card', {
        active: showed,
        selected: id === selectedLayer.id && selectedLayer.status,
        'group-item': inGroup,
      })}
      onClick={openLayerMenu}
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
          <img
            src='/images/icons/layers/eye.svg'
            alt=''
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
              removeLayer();
            }}
          />
        ) : (
          <img
            src='/images/icons/layers/eye-closed.svg'
            alt=''
            onClick={(e: SyntheticEvent) => {
              e.stopPropagation();
              showLayer();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LayerCard;
