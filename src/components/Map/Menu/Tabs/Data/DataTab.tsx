import DataCard from '../../../../Cards/Data/DataCard';
import Button from '../../../../UI/Button/Button';
import Input from '../../../../UI/Input/Input';
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
          {[
            { id: 1, v: true },
            { id: 2, v: true },
            { id: 3, v: true },
          ].map((i: any) => (
            <DataCard key={i.id} title={'asdasd'} isUsed={i.v} />
          ))}
        </ul>
        <h4>Доступные наборы</h4>
        <ul className='tab-list'>
          {[
            { id: 1, v: false },
            { id: 2, v: false },
            { id: 3, v: false },
          ].map((i: any) => (
            <DataCard key={i.id} title={'asdasd'} isUsed={i.v} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataTab;
