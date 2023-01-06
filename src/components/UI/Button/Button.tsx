import classNames from 'classnames';
import { ReactEventHandler, ReactNode } from 'react';
import './index.sass';

interface IButton {
  children?: ReactNode;
  color?: string;
  styles?: Object;
  onClick?: any;
  type?: 'submit' | 'reset' | 'button';
  size?: 'small' | 'medium' | 'large';
}

const Button = ({
  children,
  color = 'primary',
  styles,
  onClick,
  type = 'button',
  size = 'medium',
}: IButton) => {
  return (
    <button
      className={classNames('custom-button', {
        [color]: color,
        [size]: size,
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
