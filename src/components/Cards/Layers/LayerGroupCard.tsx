import classNames from 'classnames';
import { useState } from 'react';
import LayerCard from './LayerCard';
import { declOfNum } from '../../../utils';
import './index.sass';

interface ILayerGroupCard {
  layers: Array<ILayerCard>;
}

const LayerGroupCard = ({ layers }: ILayerGroupCard) => {
  const [opened, setOpened] = useState<boolean>(false);
  const layerCountText = declOfNum(layers.length, ['слой', 'слоя', 'слоёв']);
  console.log('layers', layers);
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
            layerIconType='3d'
            layerType={layer.layerType}
          />
        ))}
      </div>
    </div>
  );
};

export default LayerGroupCard;
