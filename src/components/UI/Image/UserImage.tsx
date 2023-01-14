import classNames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store/reducer';
import Modal from '../../Modal/Modal';
import ImageUploader from '../../Uploaders/Image/ImageUploader';
import './index.sass';

interface IUserImage {
  size?: 'small' | 'default' | 'large';
  figure?: 'circle' | 'default';
  variant?: 'bordered' | 'default';
  canUpdate?: boolean;
  className?: string;
}

const UserImage = ({
  size = 'default',
  figure = 'default',
  variant = 'default',
  canUpdate = false,
  className = '',
}: IUserImage) => {
  const navigate = useNavigate();
  const [modalShowed, setModalShowed] = useState<boolean>(false);
  const photo = useSelector((state: RootState) => state.user.user.photo);
  const goToProfile = () => navigate('/profile');
  const openModal = () => setModalShowed(true);
  return (
    <>
      <div
        className={classNames('user-image', {
          [size]: size,
          [figure]: figure,
          [variant]: variant,
          'has-image': photo,
          [`${className}`]: className,
        })}
        onClick={canUpdate ? openModal : goToProfile}
      >
        <img src={photo || '/images/icons/user.svg'} alt=' ' />
        {canUpdate && (
          <img src='/images/icons/pencil.svg' alt=' ' className='pencil' />
        )}
      </div>
      <Modal
        state={modalShowed}
        setState={setModalShowed}
        className='upload-image-modal'
        isNeededPadding
      >
        <ImageUploader />
      </Modal>
    </>
  );
};

export default UserImage;
