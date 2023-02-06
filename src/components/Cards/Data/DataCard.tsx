import classNames from 'classnames';
import './index.sass';

interface IDataCard {
  isUsed?: boolean;
  title?: string;
  fileSize?: string;
  fileType?: string;
  onDelete?: () => void;
}

const DataCard = ({
  isUsed = true,
  title,
  fileSize,
  onDelete,
  fileType,
}: IDataCard) => {
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
          <span className='data-card-info'>
            type<span className='dot-divider'></span>
            {fileType || 'fileType'}
            <span className='dot-divider'></span>
            {fileSize || 'fileSize'}
          </span>
        </div>
      </div>
      {isUsed ? (
        <img src='/images/icons/data/trash.svg' alt='' onClick={onDelete} />
      ) : (
        <img src='/images/icons/plus.svg' alt='' />
      )}
    </div>
  );
};

export default DataCard;
