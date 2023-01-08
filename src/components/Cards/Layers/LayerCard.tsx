import classNames from 'classnames';
import { useState } from 'react';
import './index.sass';

const LayerCard = ({ id, name, layerType }: ILayerCard) => {
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
        <h6>{name || '!!! Без имени !!!'}</h6>
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
