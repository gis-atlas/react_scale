import { useRef, useState } from 'react';
import './index.sass';

interface IInput {
  label?: string;
  placeholder?: string;
}

const Input = ({ label, placeholder }: IInput) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(true);
  const [focused, setFocused] = useState<boolean>(false);

  const handleInput = (): void => {
    if (ref.current?.value.length === 0) {
      console.log('asd');
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
    }
  };

  return (
    <div className='form-input'>
      <input
        ref={ref}
        onChange={handleInput}
        placeholder={isInputEmpty && focused ? placeholder : ''}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <label
        className={!isInputEmpty ? 'filled' : ''}
        onClick={(e) => ref.current?.focus()}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
