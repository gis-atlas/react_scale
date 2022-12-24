import Form from '../components/Form';

const Login = () => {
  const a = (form: HTMLFormElement) => console.log(form);
  return (
    <div className='log-reg-container'>
      <h1>Вход</h1>
      <Form submitHandler={a} />
    </div>
  );
};

export default Login;
