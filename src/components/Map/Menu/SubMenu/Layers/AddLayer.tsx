import { useState } from 'react';
import Input from '../../../../UI/Input/Input';
import Select from '../../../../UI/Select/Select';
import DataUploader from '../../../../Uploaders/Data/DataUploader';
import './index.sass';

const AddLayer = () => {
  const [isDataUploaderOpened, setIsDataUploaderOpened] = useState(false);

  return (
    <div className='sub-menu sub-menu-layers'>
      <h3>Новый слой</h3>
      <div className='layer-parameters'>
        <h5>Параметры слоя</h5>
        <Input label='Имя слоя' name='layerName' />
      </div>
      <div className='data-source'>
        <h5>Источник данных</h5>
        <div className='data-source-list'>
          <Select
            state='Выбрать из каталога'
            variant='contained'
            size='large'
          />
          <Select
            state='Загрузить с компьютера'
            variant='contained'
            size='large'
            getSelectStatus={setIsDataUploaderOpened}
          />
          {isDataUploaderOpened && <DataUploader />}
        </div>
      </div>
    </div>
  );
};

export default AddLayer;
