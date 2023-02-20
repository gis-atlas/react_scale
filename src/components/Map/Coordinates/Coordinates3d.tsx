import './Coordinates3d.sass';

interface Props {}

const Coordinates3d = (props: Props) => {
  return (
    <div className='coordinates-3d-picker'>
      <div className='platform'>
        <div className='axis axis-x'></div>
        <div className='axis axis-y'></div>
        <div className='axis axis-y axis-y-helper'></div>
        <div className='axis axis-z axis-z-top'></div>
        <div className='axis axis-z axis-z-bottom'></div>
      </div>
    </div>
  );
};

export default Coordinates3d;
