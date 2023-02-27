import { useState } from 'react';
import Coordinates3d from '../components/Map/Coordinates/Coordinates3d';
import {
  default as Input,
  default as NewInput,
} from '../components/UI/Input/Input';
import Select from '../components/UI/Select/Select';

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
      <Coordinates3d />
      {/* </div> */}
      {/* <h1>{state}</h1> */}
    </div>
  );
};

export default Test;
