import { ReactNode } from 'react';
import './index.sass';

interface ICard {
  title?: string;
  children?: ReactNode;
  styles?: object;
}

const Card = ({ title, children, styles }: ICard) => {
  return (
    <section className='custom-card'>
      <h3>{title}</h3>
      <div className='custom-card-content' style={styles}>
        {children}
      </div>
    </section>
  );
};

export default Card;
