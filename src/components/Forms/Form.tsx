import { FormEvent } from 'react';
import Input from '../UI/Input/Input';
import './index.sass';

const LogRegForm = ({ submitHandler }: any) => {
  const prepareSubmitHandler = (event: FormEvent): void => {
    const target = event.target as HTMLFormElement;
    event.preventDefault();
    submitHandler(target);
  };
  return (
    <form className='log-reg-form' onSubmit={prepareSubmitHandler}>
      <Input placeholder='Email адрес' />
      <Input placeholder='Пароль' />
      <Input placeholder='Повторите пароль' />
    </form>
  );
};

export default LogRegForm;
