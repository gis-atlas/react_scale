import classNames from 'classnames';
import { ReactNode } from 'react';
import './index.sass';

interface ICard {
  title?: string;
  children?: ReactNode;
  styles?: object;
  variant?: string;
}

const Card = ({ title, children, styles, variant = '' }: ICard) => {
  return (
    <section className='custom-card'>
      <h3>{title}</h3>
      <div
        className={classNames('custom-card-content', {
          [variant]: variant,
        })}
        style={styles}
      >
        {children}
      </div>
    </section>
  );
};

export default Card;
