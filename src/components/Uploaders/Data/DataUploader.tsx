import classNames from 'classnames';
import { SyntheticEvent, useEffect, useState } from 'react';
import { formatFileSize, formatFileType } from '../../../utils';
import DataCard from '../../Cards/Data/DataCard';
import './index.sass';

const DataUploader = ({ getUploadedData }: any) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onUploadFile = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    setUploadedFile(files[0]);
  };

  const onDelete = () => {
    setUploadedFile(null);
  };

  useEffect(() => {
    if (uploadedFile) {
      getUploadedData({
        name: uploadedFile.name.split('.')[0],
        file: uploadedFile,
        fileSize: formatFileSize(uploadedFile.size),
        fileType: formatFileType(uploadedFile.type),
      });
    } else {
      getUploadedData(null);
    }
  }, [uploadedFile]);

  return (
    <div
      className={classNames('data-uploader', {
        uploaded: uploadedFile,
      })}
    >
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
    </div>
  );
};

export default DataUploader;
