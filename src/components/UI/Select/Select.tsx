import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './index.sass';

interface ISelect {
  state?: string;
  options?: Array<string> | Array<any>;
  setState?: any;
  selectStatus?: boolean;
  getSelectStatus?: any;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'contained';
  type?: 'default' | 'list';
  triangle?: 'default' | 'closely';
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
  type = 'default',
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
        {type === 'default'
          ? options?.map(option => (
              <li
                className={classNames({ current: option === state })}
                key={option}
                onClick={() => onOptionChange(option)}
              >
                {option || 'Без названия'}
              </li>
            ))
          : options?.map(option => (
              <li key={option.id} onClick={option.onClick}>
                {option.name}
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Select;
