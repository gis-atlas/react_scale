import { FormEvent } from 'react';

const LogRegForm = ({ submitHandler }: any) => {
  const prepareSubmitHandler = (event: FormEvent): void => {
    const target = event.target as HTMLFormElement;
    event.preventDefault();
    submitHandler(target);
  };
  return <form className='log-reg-form' onSubmit={prepareSubmitHandler}></form>;
};

export default LogRegForm;
