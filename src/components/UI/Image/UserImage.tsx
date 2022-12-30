import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store/reducer';

import './index.sass';

interface IUserImage {
  size?: 'small' | 'default' | 'large';
  figure?: 'circle' | 'default';
  variant?: 'bordered' | 'default';
}

const UserImage = ({
  size = 'default',
  figure = 'default',
  variant = 'default',
}: IUserImage) => {
  const navigate = useNavigate();
  const photo = useSelector((state: RootState) => state.user.photo);
  const goToProfile = () => navigate('/profile');
  return (
    <div
      className={classNames('user-image', {
        [size]: size,
        [figure]: figure,
        [variant]: variant,
      })}
      onClick={goToProfile}
    >
      <img src={photo} alt='' />
    </div>
  );
};

export default UserImage;
