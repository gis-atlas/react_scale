import classNames from 'classnames';
import { ReactEventHandler, ReactNode } from 'react';
import './index.sass';

interface IButton {
  size?: string;
  children?: ReactNode;
  color?: string;
  styles?: Object;
  onClick?: ReactEventHandler;
}

const Button = ({ children, color = 'primary', styles, onClick }: IButton) => {
  return (
    <button
      className={classNames('custom-button', {
        [color]: color,
      })}
      style={styles}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
