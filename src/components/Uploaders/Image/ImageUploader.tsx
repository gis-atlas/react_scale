import classNames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import Modal from '../../Modal/Modal';
import './index.sass';

const ImageUploader = () => {
  const [modalShowed, setModalShowed] = useState<boolean>(false);
  const photo = useSelector((state: RootState) => state.user.user.photo);
  const openModal = (): void => {
    setModalShowed(true);
  };
  return (
    <>
      <div
        className={classNames('image-uploader', {
          'user-background': !photo,
        })}
        onClick={openModal}
      >
        {photo && <img src={photo} alt='' className='photo' />}
        <img src='/images/icons/pencil.svg' alt='' />
      </div>
      <Modal state={modalShowed} setState={setModalShowed}></Modal>
    </>
  );
};

export default ImageUploader;
