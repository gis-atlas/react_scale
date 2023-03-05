import classNames from 'classnames';
import { SyntheticEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import {
  disableMode,
  enableMeasureMode,
  setRulerType,
  toggleRuler,
} from '../../../store/map';
import { RootState } from '../../../store/reducer';
import Button from '../../UI/Button/Button';
import './index.sass';

const MapControls = () => {
  const dispatch = useAppDispatch();

  const { ruler } = useSelector((state: RootState) => state.map.controls);
  const changeRulerType = (e: SyntheticEvent, type: string) => {
    e.stopPropagation();
    dispatch(setRulerType(type));
  };

  useEffect(() => {
    if (ruler.state) {
      dispatch(enableMeasureMode());
    } else {
      dispatch(disableMode());
    }
  }, [dispatch, ruler.state]);

  return (
    <div className='map-controls'>
      <Button variant='circle' color='secondary'>
        <img src='/images/icons/map/loupe.svg' alt='' />
      </Button>
      <Button
        variant='circle'
        color='secondary'
        className={classNames('ruler relative', { active: ruler.state })}
        onClick={() => dispatch(toggleRuler())}
      >
        <img src='/images/icons/map/ruler.svg' alt='' />
        {ruler.state && (
          <ul className='ruler-types flex flex-col gap-1 absolute center top-10'>
            <li
              className={classNames({ active: ruler.type === 'distance' })}
              onClick={(e: SyntheticEvent) => changeRulerType(e, 'distance')}
            >
              Расстояние <span>км</span>
            </li>
            <li
              className={classNames({ active: ruler.type === 'area' })}
              onClick={(e: SyntheticEvent) => changeRulerType(e, 'area')}
            >
              Площадь
              <span>
                км<sup>2</sup>
              </span>
            </li>
          </ul>
        )}
      </Button>
      <Button variant='circle' color='secondary'>
        <img src='/images/icons/map/pencil.svg' alt='' />
      </Button>
      <Button variant='circle' color='secondary'>
        2D
      </Button>
      <Button variant='circle' color='secondary'>
        <img src='/images/icons/map/notification.svg' alt='' />
      </Button>
    </div>
  );
};

export default MapControls;
