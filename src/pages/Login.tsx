import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Forms/Form';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import { useAppDispatch } from '../store';
import { loginUser } from '../store/user';
import { RootState } from '../store/reducer';
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const loginHandler = (form: HTMLFormElement) => {
    const { email, password } = form;
    const loginData = {
      email: email.value,
      password: password.value,
    };
    dispatch(loginUser(loginData));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className='log-reg-container'>
      <h1>Вход</h1>
      <Form className='log-reg-form' submitHandler={loginHandler}>
        <div className='inputs'>
          <Input
            label='Email адрес'
            placeholder='johndoe@gmail.com'
            name='email'
          />
          <Input label='Пароль' name='password' type='password' />
        </div>
        <div className='buttons'>
          <Button color='secondary' onClick={() => navigate('/registration')}>
            Зарегистрироваться
          </Button>
          <Button color='primary' styles={{ flex: '1 0 auto' }} type='submit'>
            Войти
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
