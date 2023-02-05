import classNames from 'classnames';
import './index.sass';
import { useEffect, useState } from 'react';

interface ISelect {
  state?: string;
  options?: Array<string>;
  setState?: any;
  getSelectStatus?: any;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'contained';
}

const Select = ({
  variant = 'text',
  size = 'medium',
  state = '',
  options = [],
  setState,
  getSelectStatus = () => {},
}: ISelect) => {
  const [opened, setOpened] = useState<boolean>(false);

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
        empty: options.length === 0,
        [`${variant}`]: variant,
        [`${size}`]: size,
      })}
    >
      <div
        className={classNames('current-option', {
          [`${size}`]: size,
        })}
        onClick={() => setOpened((prev) => !prev)}
      >
        <span>{state}</span>
        <img src='/images/icons/triangle.svg' alt='' />
      </div>
      <ul className='options'>
        {options?.map((option) => (
          <li
            className={classNames({ current: option === state })}
            key={option}
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
