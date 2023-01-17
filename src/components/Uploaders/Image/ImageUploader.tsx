import { SyntheticEvent, useState } from 'react';
import './index.sass';
import Button from '../../UI/Button/Button';
import { useAppDispatch } from '../../../store';
import { updatePhoto } from '../../../store/user';

const ImageUploader = () => {
  const dispatch = useAppDispatch();
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const onClearImage = () => {
    setUploadedImagePreview('');
  };
  const onUpdatePhoto = () => {
    const formData = new FormData();
    formData.append('file', uploadedImage);
    dispatch(updatePhoto(formData));
    onClearImage();
  };
  const onUploadImage = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files.length) {
      const uploadedPhoto = files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setUploadedImagePreview(e.target.result);
      };
      reader.readAsDataURL(uploadedPhoto);
      setUploadedImage(uploadedPhoto);
    }
  };
  return (
    <div className='image-uploader'>
      <div className='image-uploader-inner'>
        <label htmlFor='image-uploader'>
          <h3>
            Загрузите
            <br />
            фотографию
          </h3>
          <input
            type='file'
            name='image-uploader'
            accept='.png, .jpg, .jpeg'
            onChange={onUploadImage}
            multiple={false}
          />
          <img src={uploadedImagePreview} alt=' ' />
        </label>
      </div>
      {uploadedImagePreview && (
        <div className='image-uploader-controls'>
          <Button color='primary' onClick={onUpdatePhoto}>
            Сохранить
          </Button>
          <Button color='secondary' onClick={onClearImage}>
            Очистить
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
