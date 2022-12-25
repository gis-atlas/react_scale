import { useState } from 'react';
import Modal from '../../Modal/Modal';
import './index.sass';

const ImageUploader = () => {
  const [modalShowed, setModalShowed] = useState<boolean>(false);
  const openModal = (): void => {
    setModalShowed(true);
  };
  return (
    <>
      <div className='image-uploader' onClick={openModal}></div>
      <Modal state={modalShowed} setState={setModalShowed} />
    </>
  );
};

export default ImageUploader;
