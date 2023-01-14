import Input from '../components/UI/Input/Input';
import NewInput from '../components/UI/Input/Input';
import Map from '../components/Map/Map/MapLibre/MapLibreGlMap';

const Test = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        background: '#F2F7FD',
      }}
    >
      <Input label='test input' placeholder='test placeholder' />
      <Input
        type='password'
        label='test input'
        placeholder='test placeholder'
      />
      <NewInput
        prevIcon='/images/icons/plus.svg'
        appendIcon='/images/icons/copy.svg'
        placeholder='Руслан'
        useGradient
        defaultValue='Приветик'
      />
      <NewInput
        label='Пароль'
        placeholder='qwerty123456'
        defaultValue='Приветик'
        useGradient
        readonly
      />
      <Map />
    </div>
  );
};

export default Test;
