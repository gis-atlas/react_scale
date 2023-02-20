import { useState } from 'react';
import Input from '../components/UI/Input/Input';
import NewInput from '../components/UI/Input/Input';
import Select from '../components/UI/Select/Select';
import Coordinates3d from '../components/Map/Coordinates/Coordinates3d';

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
