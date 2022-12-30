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
      <div className='image-uploader user-background' onClick={openModal}>
        <img src='/images/icons/pencil.svg' alt='' />
      </div>
      <Modal state={modalShowed} setState={setModalShowed}></Modal>
    </>
  );
};

export default ImageUploader;
