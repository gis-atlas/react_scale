import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './index.sass';

interface IInput {
  name?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;

  onInput?: any;

  styles?: object;
  className?: string;

  type?: 'text' | 'password' | 'email' | 'number';

  useGradient?: boolean;
  readonly?: boolean;
  withLabel?: boolean;

  prevIcon?: string;
  onPrevIconClick?: any;
  appendIcon?: string;
  onAppendIconClick?: any;
}

const Input = ({
  name = '',
  label = '',
  placeholder = '',
  defaultValue = '',
  onInput = () => {},
  styles,
  className,
  type = 'text',
  useGradient = true,
  readonly = false,
  prevIcon,
  onPrevIconClick,
  appendIcon,
  onAppendIconClick,
  withLabel = false,
}: IInput) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [filled, setFilled] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
  };
  const onChange = (e: any) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
    if (target.value.trim() !== '') {
      setFilled(true);
    } else {
      setFilled(false);
    }
    onInput(target.value);
  };

  useEffect(() => {
    inputValue.length !== 0 && setFilled(true);
  }, [inputValue.length]);
  return (
    <div
      className={classNames('custom-input', {
        [`${className}`]: className,
      })}
      style={styles}
    >
      <label
        className={classNames({
          focused: focused || filled,
          'icon-prev': prevIcon,
          'icon-append': appendIcon,
        })}
      >
        {prevIcon && <img src={prevIcon} alt='' className='icon icon-prev' />}
        <input
          ref={inputRef}
          name={name}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={(focused || !label) && !readonly ? placeholder : ''}
          type={type}
          value={inputValue}
          readOnly={readonly}
          autoComplete='new-password'
        />
        {(!readonly || withLabel) && (
          <span
            className={classNames({
              gradient: useGradient,
            })}
          >
            {label}
          </span>
        )}
        {appendIcon && (
          <img
            src={appendIcon}
            alt=''
            className='icon icon-append'
            onClick={() => onAppendIconClick(inputRef.current)}
          />
        )}
      </label>
    </div>
  );
};

export default Input;
