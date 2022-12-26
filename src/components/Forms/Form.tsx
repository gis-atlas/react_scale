import { FormEvent } from 'react';

const Form = ({ submitHandler, children, className }: any) => {
  const prepareSubmitHandler = (event: FormEvent): void => {
    const form = event.target as HTMLFormElement;
    event.preventDefault();
    submitHandler(form);
  };
  return (
    <form className={className} onSubmit={prepareSubmitHandler}>
      {children}
    </form>
  );
};

export default Form;
