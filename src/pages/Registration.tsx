import Form from '../components/Forms/Form';

const Registration = () => {
  const a = (form: HTMLFormElement) => console.log(form);
  return (
    <div className='log-reg-container'>
      <h1>Регистрация</h1>
      <Form submitHandler={a} />
    </div>
  );
};

export default Registration;
