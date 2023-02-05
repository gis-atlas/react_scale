import { SyntheticEvent, useState } from 'react';
import './index.sass';

const DataUploader = () => {
  const [uploadedFile, setUplodedFile] = useState<File>();

  const onUploadFile = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files.length) {
      console.log(files[0]);
    }
  };

  return (
    <div className='data-uploader'>
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
          <input type='file' onChange={onUploadFile} />
        </label>
      </div>
    </div>
  );
};

export default DataUploader;
