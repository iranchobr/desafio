import { useField } from '@unform/core';
import { useEffect, useRef } from 'react';
import { Container } from './styles';

interface IInputProps {
  nameInput: string;
  nameLabel: string;
  type: 'text' | 'number' | 'email' | 'date';
  id: string;
  placeholder?: string;
}

export function Input({
  nameInput,
  nameLabel,
  type,
  id,
  placeholder,
  ...rest
}: IInputProps) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(nameInput);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        /* eslint no-param-reassign: ["error", { "props": false }] */
        ref.current.value = value;
      },
      clearValue: ref => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor={id}>{nameLabel}</label>
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        type={type}
        name={nameInput}
        id={id}
        placeholder={placeholder}
        {...rest}
      />
    </Container>
  );
}
