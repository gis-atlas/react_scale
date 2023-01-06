import DataCard from '../../../Cards/Data/DataCard';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import './index.sass';

const DataTab = () => {
  return (
    <div className='tab tab-data'>
      <div className='d-flex jc-sb ai-c'>
        <h4>Добавить новый датасет</h4>
        <Button color='secondary' variant='circle' size='small'>
          <img src='/images/icons/plus.svg' alt='' />
        </Button>
      </div>
      <Input
        className='search-dataset-input'
        prevIcon='/images/icons/loupe.svg'
        placeholder='поиск по наборам данных'
      />
      <div className='tab-list-outer'>
        <h4>Используемые в проекте</h4>
        <ul className='tab-list'>
          {[true, true, true].map((i: any) => (
            <DataCard title={'asdasd'} isUsed={i} />
          ))}
        </ul>
        <h4>Доступные наборы</h4>
        <ul className='tab-list'>
          {[false, false, false].map((i: any) => (
            <DataCard title={'asdasd'} isUsed={i} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataTab;
