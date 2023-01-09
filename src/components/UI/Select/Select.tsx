import classNames from 'classnames';
import './index.sass';
import { useState } from 'react';

interface ISelect {
  state?: string;
  options?: Array<string>;
  setState?: any;
}

const Select = ({ state = '', options = [], setState }: ISelect) => {
  const [opened, setOpened] = useState<boolean>(false);

  const onOptionChange = (option: string) => {
    setState(option);
    setOpened(false);
  };

  return (
    <div
      className={classNames('custom-select', {
        opened: opened,
      })}
    >
      <div
        className='current-option'
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
