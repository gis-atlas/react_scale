import classNames from 'classnames';
import { Fragment, useEffect, useState } from 'react';
import './index.sass';

interface ISelect {
  state?: string;
  options?: Array<string> | Array<any>;
  setState?: any;
  selectStatus?: boolean;
  getSelectStatus?: any;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'contained';
  triangle?: 'closely' | 'default';
  withoutBackground?: boolean;
  disabled?: boolean;
}

const Select = ({
  variant = 'text',
  size = 'medium',
  state = '',
  options = [],
  setState = () => {},
  selectStatus = false,
  getSelectStatus = () => {},
  triangle = 'default',
  withoutBackground = false,
  disabled = false,
}: ISelect) => {
  const [opened, setOpened] = useState<boolean>(selectStatus);

  const onOptionChange = (option: string) => {
    setState(option);
    setOpened(false);
  };

  useEffect(() => {
    getSelectStatus(opened);
  }, [opened, getSelectStatus]);

  return (
    <div
      className={classNames('custom-select', {
        opened: opened,
        'without-background': withoutBackground,
        empty: options.length === 0,
        [`${variant}`]: variant,
        [`${size}`]: size,
      })}
    >
      <div
        className={classNames('current-option', {
          [`${size}`]: size,
          [`${triangle}`]: triangle,
        })}
        onClick={() => !disabled && setOpened(prev => !prev)}
      >
        <span>{state}</span>
        <img src='/images/icons/triangle.svg' alt='' />
      </div>
      <ul className='options'>
        {options?.map(option => (
          <li
            className={classNames({ current: option === state })}
            key={option || 'Без названия'}
            onClick={() => onOptionChange(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
