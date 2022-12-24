import { useNavigate } from 'react-router-dom';
import Form from '../components/Forms/Form';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';

const Login = () => {
  const a = (form: HTMLFormElement) => console.log(form);
  const navigate = useNavigate();
  return (
    <div className='log-reg-container'>
      <h1>Вход</h1>
      <Form className='log-reg-form' submitHandler={a}>
        <div className='inputs'>
          <Input label='Email адрес' placeholder='johndoe@gmail.com' />
          <Input label='Пароль' />
        </div>
        <div className='buttons'>
          <Button color='secondary' styles={{ flex: '1 0 auto' }}>
            Войти
          </Button>
          <Button color='primary' onClick={() => navigate('/registration')}>
            Зарегистрироваться
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
