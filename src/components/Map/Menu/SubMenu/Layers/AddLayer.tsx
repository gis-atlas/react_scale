import { useState } from 'react';
import Input from '../../../../UI/Input/Input';
import Select from '../../../../UI/Select/Select';
import DataUploader from '../../../../Uploaders/Data/DataUploader';
import './index.sass';
import { useAppDispatch } from '../../../../../store';
import { enableEditMode } from '../../../../../store/map';

const AddLayer = () => {
  const dispatch = useAppDispatch();
  const [isDataUploaderOpened, setIsDataUploaderOpened] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const enableEditing = () => {
    dispatch(enableEditMode());
  };
  const getUploadedFileName = (name: string) => {
    setUploadedFileName(name);
  };
  return (
    <div className='sub-menu sub-menu-layers'>
      <h3>Новый слой</h3>
      {uploadedFileName && (
        <div className='layer-parameters'>
          <h5>Параметры слоя</h5>
          <Input
            label='Имя слоя'
            name='layerName'
            defaultValue={uploadedFileName}
          />
        </div>
      )}
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
          {isDataUploaderOpened && (
            <DataUploader getUploadedData={getUploadedFileName} />
          )}
          <Select
            state='Создать новый'
            variant='contained'
            size='large'
            options={[
              {
                id: 1,
                name: 'Перейти в режим редактирования',
                icon: '/images/icons/pencil-filled.svg',
                onClick: enableEditing,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default AddLayer;
