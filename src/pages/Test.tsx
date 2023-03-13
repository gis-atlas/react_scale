import React from 'react';
import ObjectCard from '../components/Cards/Dataset/ObjectCard';

interface Props {}

const Test = (props: Props) => {
  return (
    <div className='bg-slate-700 w-full h-screen relative'>
      <ObjectCard id={1} title='Точка рекогносцировки 3' key={1} />
    </div>
  );
};

export default Test;
