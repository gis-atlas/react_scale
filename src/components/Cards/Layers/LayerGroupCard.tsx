import classNames from 'classnames';
import { useState } from 'react';
import LayerCard from './LayerCard';
import { declOfNum } from '../../../utils';
import './index.sass';
import { findLayer } from '../../../utils/deck';

interface ILayerGroupCard {
  layers: Array<ILayerCard>;
  openedLayers: Array<ILayerCard>;
}

const LayerGroupCard = ({ layers, openedLayers }: ILayerGroupCard) => {
  const [opened, setOpened] = useState<boolean>(false);
  const layerCountText = declOfNum(layers.length, ['слой', 'слоя', 'слоёв']);
  return (
    <div
      className={classNames('layer-group-card', {
        opened: opened,
      })}
    >
      <div
        className='layer-group-card-header'
        onClick={() => setOpened((prev) => !prev)}
      >
        <div className='layer-group-card-title'>
          <img src={`/images/icons/layers/group.svg`} alt='' />
          <h6>Группа</h6>
          <span>
            {layers.length} {layerCountText}
          </span>
        </div>
        <div className='layer-group-card-controls'>
          {/* TODO: проверка, все ли слои открыты */}
          {opened ? (
            <img src='/images/icons/layers/eye.svg' alt='' />
          ) : (
            <img src='/images/icons/layers/eye-closed.svg' alt='' />
          )}
        </div>
      </div>

      <div
        className={classNames('layers-list', {
          opened: opened,
        })}
      >
        {layers?.map((layer) => (
          <LayerCard
            key={layer.id}
            id={layer.id}
            name={layer.name}
            layerIconType={
              layer.layerType === 'VECTOR'
                ? '3d'
                : layer.layerType === 'RASTER'
                ? 'relief'
                : 'demos'
            }
            active={findLayer(layer, openedLayers)}
            layerType={layer.layerType}
          />
        ))}
      </div>
    </div>
  );
};

export default LayerGroupCard;
