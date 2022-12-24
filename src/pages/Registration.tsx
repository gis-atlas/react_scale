import { useNavigate } from 'react-router-dom';
import Form from '../components/Forms/Form';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';

const Registration = () => {
  const a = (form: HTMLFormElement) => console.log(form);
  const navigate = useNavigate();
  return (
    <div className='log-reg-container'>
      <h1>Регистрация</h1>
      <Form className='log-reg-form' submitHandler={a}>
        <div className='inputs'>
          <Input label='Email адрес' placeholder='johndoe@gmail.com' />
          <Input label='Пароль' />
          <Input label='Повторите пароль' />
        </div>
        <div className='buttons'>
          <Button color='secondary' styles={{ flex: '1 0 auto' }}>
            Зарегистрироваться
          </Button>
          <Button color='primary' onClick={() => navigate('/login')}>
            Войти
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Registration;
