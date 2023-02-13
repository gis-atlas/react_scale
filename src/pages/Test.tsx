import { useState } from 'react';
import Input from '../components/UI/Input/Input';
import NewInput from '../components/UI/Input/Input';
import Select from '../components/UI/Select/Select';
import ConfigModel from '../components/Model/Config/ConfigModel';

const Test = () => {
  const [state, setState] = useState('Hello');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        // background: '#F2F7FD',
        marginLeft: '50px',
        marginTop: '50px',
      }}
    >
      {/* <div
        style={{
          padding: '20px',
          background: 'red',
        }}
      > */}
      <ConfigModel />
      {/* </div> */}
      {/* <h1>{state}</h1> */}
    </div>
  );
};

export default Test;
