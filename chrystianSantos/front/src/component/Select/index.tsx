import { useField } from '@unform/core';
import { SelectHTMLAttributes, ReactNode, useRef, useEffect } from 'react';
import { Container } from './styles';

interface ISelectProps {
  name: string;
  label: string;
  children: ReactNode;
}

type IProps = SelectHTMLAttributes<HTMLSelectElement> & ISelectProps;

export function Select({ name, label, children, ...rest }: IProps) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      ref: selectRef,
      name: fieldName,
      getValue: ref => {
        return ref.current?.value;
      },
      /* eslint no-param-reassign: ["error", { "props": false }] */
      setValue: (ref, newValue) => {
        ref.current.value = newValue;
      },
      clearValue: ref => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor={fieldName}>{label}</label>
      <select
        id={fieldName}
        ref={selectRef}
        defaultValue={defaultValue}
        {...rest}
      >
        {children}
      </select>
    </Container>
  );
}
