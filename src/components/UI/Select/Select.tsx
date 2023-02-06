import classNames from 'classnames';
import './index.sass';
import { Fragment, useEffect, useState } from 'react';

interface ISelect {
  state?: string;
  options?: Array<string> | Array<any>;
  setState?: any;
  getSelectStatus?: any;
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'contained';
  triangle?: 'closely' | 'default';
  withoutBackground?: boolean;
}

const Select = ({
  variant = 'text',
  size = 'medium',
  state = '',
  options = [],
  setState = () => {},
  getSelectStatus = () => {},
  triangle = 'default',
  withoutBackground = false,
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
        onClick={() => setOpened((prev) => !prev)}
      >
        <span>{state}</span>
        <img src='/images/icons/triangle.svg' alt='' />
      </div>
      <ul className='options'>
        {options?.map((option) => (
          <Fragment key={option.id}>
            {option.id ? (
              <li
                className={classNames({ current: option === state })}
                key={option.id}
                onClick={option.onClick}
              >
                <span>{option.name}</span>
                <img src={option.icon} alt=' ' />
              </li>
            ) : (
              <li
                className={classNames({ current: option === state })}
                key={option}
                onClick={() => onOptionChange(option)}
              >
                {option}
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Select;
