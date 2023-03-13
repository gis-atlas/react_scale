import classNames from 'classnames';
import { formatDatasetType } from '../../../utils';
import './index.sass';

interface DatasetCardProps {
  id: number;
  selected: boolean;
  datasetItem: any;
}

const DatasetCard = ({ id, selected, datasetItem }: DatasetCardProps) => {
  return (
    <div
      className={classNames(
        'dataset-card flex justify-between py-2 px-3 bg-white',
        {
          active: selected,
        }
      )}
    >
      <span className='text-xss font-semibold'>
        {formatDatasetType(datasetItem.geometry.type, id + 1)}
      </span>
      <img
        src='/images/icons/layers/target.svg'
        alt=''
        className='cursor-pointer'
      />
    </div>
  );
};

export default DatasetCard;
