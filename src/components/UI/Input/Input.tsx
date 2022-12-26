import classNames from 'classnames';
import { useRef, useState } from 'react';
import './index.sass';

interface IInput {
  label?: string;
  placeholder?: string;
  styles?: object;
  type?: string;
  className?: string;
  name?: string;
}

const Input = ({
  label,
  placeholder,
  styles,
  type = 'text',
  className,
  name,
}: IInput) => {
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
    <div
      className={classNames('form-input', {
        [`${className}`]: className,
      })}
      style={styles}
    >
      <input
        ref={ref}
        onChange={handleInput}
        placeholder={isInputEmpty && focused ? placeholder : ''}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type={type}
        name={name}
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
