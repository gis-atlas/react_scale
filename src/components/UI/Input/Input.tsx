import { useRef, useState } from 'react';
import './index.sass';

const Input = ({ placeholder }: any) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(false);

  const handleInput = (): void => {
    if (ref.current?.value.length) {
      console.log('asd');
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
    }
  };

  return (
    <div className='form-input'>
      <input ref={ref} onChange={handleInput} />
      <label
        className={isInputEmpty ? 'filled' : ''}
        onClick={(e) => ref.current?.focus()}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
