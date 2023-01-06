import classNames from 'classnames';
import './index.sass';

interface IDataCard {
  isUsed?: boolean;
  title?: string;
}

const DataCard = ({ isUsed = true, title }: IDataCard) => {
  return (
    <div
      className={classNames('data-card', {
        used: isUsed,
      })}
    >
      <div className='data-card-content'>
        {isUsed && <img src='/images/icons/data/reload.svg' alt='' />}
        <div className='data-card-about'>
          <h6>{title}</h6>
          <div className='data-card-info'>type * fileType * fileSize</div>
        </div>
      </div>
      {isUsed ? (
        <img src='/images/icons/data/trash.svg' alt='' />
      ) : (
        <img src='/images/icons/plus.svg' alt='' />
      )}
    </div>
  );
};

export default DataCard;
