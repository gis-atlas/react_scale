import classNames from 'classnames';
import { MouseEvent, ReactNode } from 'react';
import './index.sass';

interface IModal {
  children?: ReactNode;
  title?: string;
  description?: string;
  state: boolean;
  setState: any;
}

const Modal = ({ children, title, description, state, setState }: IModal) => {
  const closeModal = (e: MouseEvent): void => {
    setState(false);
  };
  return (
    <div
      className={classNames('modal-wrapper', { active: state })}
      onClick={closeModal}
    >
      <div className='modal'>
        <h2>{title}</h2>
        <p>{description}</p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
