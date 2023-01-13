import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import './PrevInput.sass';

interface IPrevInput {
  label?: string;
  placeholder?: string;
  styles?: object;
  type?: string;
  className?: string;
  name?: string;
  defaultValue?: string;
  onInput?: any;
  prevIcon?: string;
  appendIcon?: string;
  onAppendIconClick?: any;
  readonly?: boolean;
}

const PrevInput = ({
  prevIcon,
  appendIcon,
  onAppendIconClick,
  label,
  placeholder,
  styles,
  type = 'text',
  className,
  name,
  defaultValue = '',
  readonly = false,
  onInput = () => {},
}: IPrevInput) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(true);
  const [focused, setFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue);

  const handleInput = (e: any): void => {
    setValue(e.target.value);
    if (value.length === 0) {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
    }
    onInput(e.target.value);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (value.length !== 0) {
      setIsInputEmpty(false);
    } else {
      setIsInputEmpty(true);
    }
  }, [value]);

  return (
    <div
      className={classNames('form-input', {
        [`${className}`]: className,
      })}
      style={styles}
    >
      {prevIcon && <img src={prevIcon} alt='' className='icon icon-prev' />}
      <input
        ref={ref}
        onChange={handleInput}
        placeholder={(isInputEmpty && focused) || !label ? placeholder : ''}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type={type}
        name={name}
        value={value}
        className={classNames('form-input', {
          'icon-prev': prevIcon,
          'icon-append': appendIcon,
        })}
        readOnly={readonly}
      />
      {appendIcon && (
        <img
          src={appendIcon}
          alt=''
          className='icon icon-append'
          onClick={() => onAppendIconClick(ref.current)}
        />
      )}
      <label
        className={classNames({
          filled: !isInputEmpty,
          'icon-prev': prevIcon,
        })}
        onClick={(e) => ref.current?.focus()}
      >
        {label}
      </label>
    </div>
  );
};

export default PrevInput;
