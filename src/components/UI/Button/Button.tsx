import classNames from 'classnames';
import { ReactEventHandler, ReactNode } from 'react';
import './index.sass';

interface IButton {
  children?: ReactNode;
  styles?: Object;
  color?: string;
  className?: string;
  onClick?: any;
  type?: 'submit' | 'reset' | 'button';
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'circle';
}

const Button = ({
  children,
  styles,
  onClick,
  className = '',
  color = 'primary',
  type = 'button',
  size = 'medium',
  variant = 'default',
}: IButton) => {
  return (
    <button
      className={classNames('custom-button', {
        [color]: color,
        [size]: size,
        [variant]: variant,
        [className]: className,
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
