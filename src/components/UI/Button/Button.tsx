import classNames from 'classnames';
import { ReactEventHandler, ReactNode } from 'react';
import './index.sass';

interface IButton {
  size?: string;
  children?: ReactNode;
  color?: string;
  styles?: Object;
  onClick?: ReactEventHandler;
  type?: 'submit' | 'reset' | 'button';
}

const Button = ({
  children,
  color = 'primary',
  styles,
  onClick,
  type = 'button',
}: IButton) => {
  return (
    <button
      className={classNames('custom-button', {
        [color]: color,
      })}
      style={styles}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
