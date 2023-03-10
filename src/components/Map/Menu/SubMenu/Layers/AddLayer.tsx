import { FC, useState } from 'react';
import { useAppDispatch } from '../../../../../store';
import { enableEditMode } from '../../../../../store/map';
import { setUploadData } from '../../../../../store/upload';
import UploadAPI from '../../../../../store/upload/api';
import Button from '../../../../UI/Button/Button';
import Input from '../../../../UI/Input/Input';
import Select from '../../../../UI/Select/Select';
import DataUploader from '../../../../Uploaders/Data/DataUploader';

interface IAddLayer {
  projectId: number;
  layerGroups: Array<any>;
}

const AddLayer: FC<IAddLayer> = ({ projectId, layerGroups }) => {
  const dispatch = useAppDispatch();
  const [fromPC, setFromPC] = useState<boolean>(false);
  const [fileData, setFileData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  console.log('groups', layerGroups);

  const editModeOn = () => {
    dispatch(enableEditMode());
  };

  const getUploadedData = (data: any) => {
    if (!data) return;
    const { fileType, name, file } = data;
    setLoading(true);
    UploadAPI.upload(projectId, file)
      .then(res => {
        setFileData({ ...res.data, layerName: name, fileType: fileType });
      })
      .catch(() => setFileData(null));
    setLoading(false);
  };

  const changeSource = () => setFileData(null);

  return (
    <div className='sub-menu sub-menu-layers flex flex-col gap-7'>
      <h3 className='ml-3'>Новый слой</h3>
      {fileData && (
        <div className='flex flex-col gap-4'>
          <h4 className='ml-3'>Параметры слоя</h4>
          <Input
            label='Имя слоя'
            name='layerName'
            value={`${fileData?.layerName}.${fileData?.fileType}`}
          />
        </div>
      )}
      <div className='flex flex-col gap-3'>
        <h4 className='ml-3 mb-1'>Источник данных</h4>
        {fileData ? (
          <UploadedFromPCFile
            changeSource={changeSource}
            layerGroups={layerGroups}
            datasetName={fileData?.name}
            fileFormat={fileData?.extension}
            coordSystem={fileData?.srs?.name}
          />
        ) : (
          <>
            <Select state='Выбрать из каталога' variant='contained' />
            <Select
              state='Загрузить с компьютера'
              variant='contained'
              getSelectStatus={setFromPC}
            />
            {fromPC && !fileData && !loading && (
              <DataUploader getUploadedData={getUploadedData} />
            )}
            <Select
              state='Создать новый'
              variant='contained'
              type='list'
              options={[
                {
                  id: 1,
                  name: 'Перейти в режим редактирования',
                  onClick: editModeOn,
                },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
};

interface IUploadedFromPCFile {
  layerGroups?: Array<any>;
  datasetName?: string;
  fileFormat?: string;
  coordSystem?: string;
  changeSource?: () => void;
}

const UploadedFromPCFile: FC<IUploadedFromPCFile> = ({
  layerGroups,
  datasetName,
  fileFormat,
  coordSystem,
  changeSource = () => {},
}) => {
  const [layerGroup, setLayerGroup] = useState<any>('Выберите группу');
  const [opened, setOpened] = useState<boolean>(true);
  return (
    <div className='flex flex-col gap-5'>
      <Select
        state={datasetName}
        variant='contained'
        selectStatus={opened}
        getSelectStatus={setOpened}
      />
      {opened && (
        <form className='flex flex-col gap-5'>
          <Input label='Имя датасета' value={datasetName} />
          <Input label='Формат файла' value={fileFormat} readonly />
          <span className='text-xs ml-3 -mt-3'>Определяется автоматически</span>
          <Input label='Система координат' value={coordSystem} readonly />
          <span className='text-xs ml-3 -mt-3'>Определяется автоматически</span>
          <Select
            state={layerGroup}
            setState={setLayerGroup}
            variant='contained'
          />
        </form>
      )}
      <Button
        color='secondary'
        styles={{ alignSelf: 'end', marginTop: '13px' }}
        size='small'
        onClick={changeSource}
      >
        Выбрать другой источник
      </Button>
    </div>
  );
};

export default AddLayer;
