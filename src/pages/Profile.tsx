import Card from '../components/Cards/Card';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';

const Profile = () => {
  return (
    <div className='profile'>
      <h1>Профиль</h1>
      <Card
        title='Общая информация'
        styles={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
      >
        <div className='d-flex' style={{ gap: '27px' }}>
          <p>img</p>
          <div className='d-grid' style={{ flex: 1 }}>
            <Input label='Имя' />
            <Input label='Дата рождения' />
            <Input label='Ник в telegram' />
            <Input label='Город' />
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
