import classNames from 'classnames';
import { SyntheticEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import {
  disableMode,
  enableMeasureMode,
  setRulerType,
  setViewMode,
  toggleRuler,
  toggleView,
} from '../../../store/map';
import { RootState } from '../../../store/reducer';
import Button from '../../UI/Button/Button';
import './index.sass';

const MapControls = () => {
  const dispatch = useAppDispatch();

  const { ruler, view } = useSelector((state: RootState) => state.map.controls);

  const changeRulerType = (e: SyntheticEvent, type: string) => {
    e.stopPropagation();
    dispatch(setRulerType(type));
  };

  const changeViewMode = (
    e: SyntheticEvent,
    type: '2D' | '3D' | 'TERRAIN' | 'GLOBE'
  ) => {
    e.stopPropagation();
    console.log(type);
    dispatch(setViewMode(type));
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
      <Button
        variant='circle'
        color='secondary'
        className={classNames('view relative', { active: view.state })}
        onClick={() => dispatch(toggleView())}
      >
        {view.text ? view.text : <img src={view.icon} alt=' ' />}
        {view.state && (
          <ul className='views flex flex-col gap-1 absolute center top-10'>
            <li
              className={classNames({ active: view.text === '2D' })}
              onClick={(e: SyntheticEvent) => changeViewMode(e, '2D')}
            >
              2D
            </li>
            <li
              className={classNames({ active: view.text === '3D' })}
              onClick={(e: SyntheticEvent) => changeViewMode(e, '3D')}
            >
              3D
            </li>
            <li
              className={classNames({ active: view.text === 'T' })}
              onClick={(e: SyntheticEvent) => changeViewMode(e, 'TERRAIN')}
            >
              Terrain
            </li>
            <li
              className={classNames({ active: view.text === 'G' })}
              onClick={(e: SyntheticEvent) => changeViewMode(e, 'GLOBE')}
            >
              Глобус
            </li>
          </ul>
        )}
      </Button>
      <Button variant='circle' color='secondary'>
        <img src='/images/icons/map/notification.svg' alt='' />
      </Button>
    </div>
  );
};

export default MapControls;
