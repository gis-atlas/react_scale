import classNames from 'classnames';
import { MouseEvent, ReactNode, useRef } from 'react';
import './index.sass';
import Button from '../UI/Button/Button';

interface IModal {
  children?: ReactNode;
  title?: string;
  description?: string;
  isNeededPadding?: boolean;
  state: boolean;
  setState: any;
  className?: string;
}

const Modal = ({
  children,
  title,
  description,
  state,
  setState,
  className = '',
  isNeededPadding = false,
}: IModal) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeModal = (e: MouseEvent) => setState(false);

  return (
    <div
      ref={wrapperRef}
      className={classNames('modal-wrapper', { active: state })}
      onClick={closeModal}
    >
      <div
        className={classNames('modal', {
          'with-padding': isNeededPadding,
          [`${className}`]: className,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <p>{description}</p>
        {children}
        <Button
          variant='circle'
          color='secondary'
          className='close-button'
          onClick={closeModal}
        >
          <img
            src='/images/icons/plus.svg'
            alt=''
            style={{
              transform: 'rotate(45deg)',
              width: '12px',
              height: '12px',
            }}
          />
        </Button>
      </div>
    </div>
  );
};

export default Modal;
