import { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface ICheckBoxProps {
  name: string;
  label?: string;
  value?: string;
}
type IInputProps = InputHTMLAttributes<HTMLInputElement> & ICheckBoxProps;

export function CheckBox({ name, label, value, ...rest }: IInputProps) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const defaultChecked = defaultValue === value;

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.checked;
      },
      /* eslint no-param-reassign: ["error", { "props": false }] */
      clearValue: ref => {
        ref.current.checked = defaultChecked;
      },
      setValue: (ref, value_) => {
        ref.current.checked = value_;
      },
    });
  }, [defaultValue, fieldName, registerField, defaultChecked]);

  return (
    <div>
      <input
        defaultChecked={defaultChecked}
        ref={inputRef}
        value={value}
        type="checkbox"
        id={fieldName}
        {...rest}
      />

      <label htmlFor={fieldName} key={fieldName}>
        {label}
      </label>
    </div>
  );
}
