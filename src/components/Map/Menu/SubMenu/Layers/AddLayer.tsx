import { FC, useState } from 'react';
import Input from '../../../../UI/Input/Input';
import Select from '../../../../UI/Select/Select';
import DataUploader from '../../../../Uploaders/Data/DataUploader';
import './index.sass';
import { useAppDispatch } from '../../../../../store';
import { enableEditMode } from '../../../../../store/map';
import { setUploadData as setUploadDataServer } from '../../../../../store/upload';
import Button from '../../../../UI/Button/Button';
import UploadAPI from '../../../../../store/upload/api';

interface IAddLayer {
  layerGroups?: Array<any>;
  projectId: string | undefined;
}

const AddLayer: FC<IAddLayer> = ({ projectId, layerGroups = [] }) => {
  const dispatch = useAppDispatch();
  const [isDataUploaderOpened, setIsDataUploaderOpened] = useState(false);
  const [uploadedData, setUploadedData]: any = useState(null);
  const [isUploadedDataOpened, setIsUploadedDataOpened] = useState(false);
  const enableEditing = (): any => {
    dispatch(enableEditMode());
  };
  const getUploadedData = (data: any) => {
    if (!data) return;
    const { name, fileSize, fileType, file } = data;
    setUploadedData({
      name,
      fileSize,
      fileType,
    });
    UploadAPI.upload(Number(projectId), file).then((res) => {
      console.log(res.data);
      setUploadedData({
        layerId: res.data.id,
        name,
        fileSize,
        fileType,
        extension: res.data.extension,
        srs: res.data.srs,
      });
      dispatch(
        setUploadDataServer({
          layerId: res.data.id,
          layerName: res.data.name,
          layerGroupId: layerGroups[0].id,
          srs: res.data.srs,
        })
      );
    });
  };
  return (
    <div className='sub-menu sub-menu-layers'>
      <h3>Новый слой</h3>
      {uploadedData && (
        <div className='layer-parameters'>
          <h5>Параметры слоя</h5>
          <Input
            label='Имя слоя'
            name='layerName'
            defaultValue={uploadedData.name}
          />
        </div>
      )}
      <div className='data-source'>
        <h5>Источник данных</h5>
        <div className='data-source-list'>
          {uploadedData ? (
            <div
              className='d-flex f-column'
              style={{ gap: isUploadedDataOpened ? '30px' : '10px' }}
            >
              <Select
                state={`${uploadedData.name}.${uploadedData.fileType}`}
                variant='contained'
                getSelectStatus={setIsUploadedDataOpened}
              />
              {isUploadedDataOpened && (
                <div className='d-flex f-column' style={{ gap: '20px' }}>
                  <Input
                    label='Имя датасета'
                    defaultValue={`${uploadedData.name}.${uploadedData.fileType}`}
                  />
                  <Input
                    label='Формат файла'
                    defaultValue={uploadedData.extension}
                    readonly
                    withLabel
                  />
                  <span
                    style={{
                      fontSize: '12px',
                      marginTop: '-14px',
                      marginLeft: '12px',
                      color: '#9BAAC2',
                    }}
                  >
                    Определяется автоматически
                  </span>
                  <Input
                    label='Система координат'
                    defaultValue={uploadedData?.srs?.name}
                    readonly
                    withLabel
                  />
                  <span
                    style={{
                      fontSize: '12px',
                      marginTop: '-14px',
                      marginLeft: '12px',
                      color: '#9BAAC2',
                    }}
                  >
                    Определяется автоматически
                  </span>
                </div>
              )}
              <Button
                color='secondary'
                size='small'
                styles={{ alignSelf: 'end', marginTop: '10px' }}
                onClick={() => setUploadedData(null)}
              >
                Выбрать другой источник
              </Button>
            </div>
          ) : (
            <>
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
                <DataUploader getUploadedData={getUploadedData} />
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddLayer;
