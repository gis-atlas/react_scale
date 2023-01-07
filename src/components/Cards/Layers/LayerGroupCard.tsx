import classNames from 'classnames';
import { useState } from 'react';
import './index.sass';
import LayerCard from './LayerCard';

interface ILayerGroupCard {
  layers: Array<ILayerCard>;
}

const LayerGroupCard = ({ layers }: ILayerGroupCard) => {
  const [opened, setOpened] = useState<boolean>(false);

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
          <span>{layers.length} слоёв</span>
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
          <LayerCard name={layer.name} layerType='3d' />
        ))}
      </div>
    </div>
  );
};

export default LayerGroupCard;
