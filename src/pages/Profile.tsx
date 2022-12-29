import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import Card from '../components/Cards/Card';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import ImageUploader from '../components/Uploaders/Image/ImageUploader';
import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../store';
import { getProfileData, updateProfileData } from '../store/user';
import { InputType } from 'zlib';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { name, telegram, birthday, city } = useSelector(
    (state: RootState) => state.user
  );
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const onSaveChanges = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    // TODO: изменить на беке / разобраться, почему firstname lastname
    const lastName = form.username.value;
    const firstName = '';
    const updateData = {
      firstName,
      lastName,
      telegram: form.telegram.value,
      birthday: form.birthday.value,
      city: form.city.value,
    };
    dispatch(updateProfileData(updateData));
  };
  useEffect(() => {
    dispatch(getProfileData());
  }, []);
  return (
    <div className='profile'>
      <h1>Профиль</h1>
      <Card
        title='Общая информация'
        styles={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
      >
        {isEditMode ? (
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
            onSubmit={onSaveChanges}
          >
            <div className='d-flex' style={{ gap: '27px' }}>
              <ImageUploader />
              <div className='d-grid' style={{ flex: 1 }}>
                <Input label='Имя' name='username' defaultValue={name} />
                <Input
                  label='Дата рождения'
                  name='telegram'
                  defaultValue={telegram}
                />
                <Input
                  label='Ник в telegram'
                  name='birthday'
                  defaultValue={birthday}
                />
                <Input label='Город' name='city' defaultValue={city} />
              </div>
            </div>
            <div className='d-flex' style={{ justifyContent: 'end' }}>
              <Button type='submit'>Сохранить изменения</Button>
            </div>
          </form>
        ) : (
          <>
            <div className='d-flex' style={{ gap: '27px' }}>
              <ImageUploader />
              <div className='d-grid' style={{ flex: 1 }}>
                <p>{name}</p>
                <p>{telegram}</p>
                <p>{birthday}</p>
                <p>{city}</p>
              </div>
            </div>
            <div className='d-flex' style={{ justifyContent: 'end' }}>
              <Button onClick={() => setEditMode(true)}>Редактировать</Button>
            </div>
          </>
        )}
      </Card>
      <Card
        title='Обновить пароль'
        styles={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
      >
        <div className='d-flex' style={{ gap: '39px' }}>
          <Input
            label='Старый пароль'
            type='password'
            styles={{ flex: '1 0 auto' }}
          />
          <Input
            label='Новый пароль'
            type='password'
            styles={{ flex: '1 0 auto' }}
          />
        </div>
        <div className='d-flex' style={{ justifyContent: 'end' }}>
          <Button>Обновить</Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
