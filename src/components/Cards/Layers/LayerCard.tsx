import classNames from 'classnames';
import { useState } from 'react';
import './index.sass';

interface ILayerCard {
  title?: string;
  layerType: '3d' | 'demos' | 'relief';
}

const LayerCard = ({ title, layerType }: ILayerCard) => {
  const [showed, setShowed] = useState<boolean>(false);
  return (
    <div
      className={classNames('layer-card', {
        active: showed,
      })}
    >
      <div className='layer-card-title'>
        <div className={`type-${layerType} layer-card-type`}>
          <img src={`/images/icons/layers/${layerType}.svg`} alt='' />
        </div>
        <h5>{title}</h5>
      </div>
      <div className='layer-card-controls'>
        <img src='/images/icons/layers/target.svg' alt='' />
        {showed ? (
          <img
            src='/images/icons/layers/eye.svg'
            alt=''
            onClick={() => setShowed(false)}
          />
        ) : (
          <img
            src='/images/icons/layers/eye-closed.svg'
            alt=''
            onClick={() => setShowed(true)}
          />
        )}
      </div>
    </div>
  );
};

export default LayerCard;
