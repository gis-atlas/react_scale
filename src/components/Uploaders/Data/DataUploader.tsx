import { SyntheticEvent, useEffect, useState } from 'react';
import './index.sass';
import classNames from 'classnames';
import { formatFileSize, formatFileType } from '../../../utils';
import DataCard from '../../Cards/Data/DataCard';

const DataUploader = ({ getUploadedData }: any) => {
  const [uploadedFile, setUplodedFile] = useState<File | null>(null);

  const onUploadFile = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    setUplodedFile(files[0]);
  };

  const onDelete = () => {
    setUplodedFile(null);
  };

  useEffect(() => {
    if (uploadedFile) {
      getUploadedData(uploadedFile.name.split('.')[0]);
    } else {
      getUploadedData('');
    }
  }, [uploadedFile]);

  return (
    <div
      className={classNames('data-uploader', {
        uploaded: uploadedFile,
      })}
    >
      {uploadedFile ? (
        <>
          <DataCard
            title={uploadedFile.name}
            fileSize={formatFileSize(uploadedFile.size)}
            fileType={formatFileType(uploadedFile.type)}
            onDelete={onDelete}
          />
        </>
      ) : (
        <div className='data-uploader-inner'>
          <label>
            <span>
              Перетащите файл сюда
              <br />
              или
              <br />
              <b>
                Выберите из файлов
                <br />
                на компьютере
              </b>
            </span>
            <input
              type='file'
              onChange={onUploadFile}
              accept='.geojson, .json, .csv'
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default DataUploader;
