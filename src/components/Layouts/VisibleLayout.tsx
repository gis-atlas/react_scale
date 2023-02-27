import classNames from 'classnames';
import { ReactNode } from 'react';
import './index.sass';

interface IVisibleLayout {
  isVisible: boolean;
  children: ReactNode;
  style: object;
}

const VisibleLayout = ({ isVisible, children, style }: IVisibleLayout) => {
  return (
    <div
      className={classNames('visible-layout', {
        visible: isVisible,
      })}
      style={style}
    >
      {children}
    </div>
  );
};

export default VisibleLayout;
