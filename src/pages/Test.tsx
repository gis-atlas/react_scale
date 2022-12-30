import Input from '../components/UI/Input/Input';

const Test = () => {
  return (
    <div>
      <Input label='test input' placeholder='test placeholder' />
      <Input
        type='password'
        label='test input'
        placeholder='test placeholder'
      />
    </div>
  );
};

export default Test;
