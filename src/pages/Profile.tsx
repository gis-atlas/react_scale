import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { getUserData } from '../store/user';
import Card from '../components/Cards/Card';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import ImageUploader from '../components/Uploaders/Image/ImageUploader';
import { useEffect } from 'react';
import { useAppDispatch } from '../store';

const Profile = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const { name, telegram, birthday, city } = useSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserData());
    }
  }, []);
  return (
    <div className='profile'>
      <h1>Профиль</h1>
      <Card
        title='Общая информация'
        styles={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
      >
        <div className='d-flex' style={{ gap: '27px' }}>
          <ImageUploader />
          <div className='d-grid' style={{ flex: 1 }}>
            <Input label='Имя' defaultValue={name} />
            <Input label='Дата рождения' defaultValue={telegram} />
            <Input label='Ник в telegram' defaultValue={birthday} />
            <Input label='Город' defaultValue={city} />
          </div>
        </div>
        <div className='d-flex' style={{ justifyContent: 'end' }}>
          <Button styles={{}}>Обновить</Button>
        </div>
      </Card>
      <Card
        title='Обновить пароль'
        styles={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
      >
        <div className='d-flex' style={{ gap: '39px' }}>
          <Input label='Старый пароль' styles={{ flex: '1 0 auto' }} />
          <Input label='Новый пароль' styles={{ flex: '1 0 auto' }} />
        </div>
        <div className='d-flex' style={{ justifyContent: 'end' }}>
          <Button styles={{}}>Обновить</Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
