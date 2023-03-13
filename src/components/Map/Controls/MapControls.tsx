import classNames from 'classnames';
import { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../store';
import {
  setRulerMode,
  setViewMode,
  toggleRuler,
  toggleView,
} from '../../../store/map';
import { modes, views } from '../../../store/map/mapConfig';
import { RootState } from '../../../store/reducer';
import Button from '../../UI/Button/Button';
import './index.sass';

const MapControls = () => {
  const dispatch = useAppDispatch();

  const { ruler, view } = useSelector((state: RootState) => state.map.controls);

  const changeRulerMode = (e: SyntheticEvent, mode: any) => {
    e.stopPropagation();
    dispatch(setRulerMode(mode));
  };

  const changeViewMode = (e: SyntheticEvent, mode: any) => {
    e.stopPropagation();
    dispatch(setViewMode(mode));
  };

  return (
    <div className='map-controls'>
      <Button variant='circle' color='secondary'>
        <img src='/images/icons/map/loupe.svg' alt='' />
      </Button>
      <Button
        variant='circle'
        color='secondary'
        className={classNames('ruler relative', {
          active: ruler.status,
        })}
        onClick={() => dispatch(toggleRuler())}
      >
        <img src='/images/icons/map/ruler.svg' alt='' />
        {ruler.status && (
          <ul className='ruler-types absolute center top-10 flex flex-col gap-1'>
            {modes.measure.map(mode => (
              <li
                key={mode.label}
                className={classNames(
                  'py-1 px-3 bg-white text-xss font-bold rounded-2xl',
                  {
                    active: mode.label === ruler.mode.label,
                  }
                )}
                onClick={e => changeRulerMode(e, mode)}
              >
                <span>{mode.label}</span>
                <span className='unit'>{mode.units}</span>
              </li>
            ))}
          </ul>
        )}
      </Button>
      <Button
        variant='circle'
        color='secondary'
        className={classNames('view relative', {
          active: view.status,
        })}
        onClick={() => dispatch(toggleView())}
      >
        {view.mode.icon ? (
          <img src={view.mode.src} alt='' />
        ) : (
          <span className='text-sm font-bold'>{view.mode.shortName}</span>
        )}
        {view.status && (
          <ul className='views absolute center top-10 flex flex-col gap-1'>
            {views.map((view: any) => (
              <li
                key={view.shortName}
                className='text-xss font-bold w-20 bg-white rounded-2xl py-1'
                onClick={e => changeViewMode(e, view)}
              >
                {view.name}
              </li>
            ))}
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
