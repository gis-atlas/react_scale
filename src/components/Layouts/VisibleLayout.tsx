import classNames from 'classnames';
import './index.sass';
import { ReactNode } from 'react';

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
