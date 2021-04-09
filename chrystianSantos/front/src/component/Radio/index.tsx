import { useEffect, useRef, RefObject } from 'react';

import { useField } from '@unform/core';

interface IRadioProps {
  name: string;
  label?: string;
  options: {
    id: string;
    value: string;
    label: string;
  }[];
}
type RefInputEl = RefObject<HTMLInputElement[]>;

export function Radio({ name, label, options, ...rest }: IRadioProps) {
  const inputRefs = useRef(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs,
      getValue: (refs: RefInputEl) => {
        return refs.current?.find(input => input?.checked)?.value || '';
      },
      setValue: (refs: RefInputEl, id: string) => {
        const inputRef = refs.current?.find(ref => ref.id === id);
        if (inputRef) inputRef.checked = true;
      },
      clearValue: (refs: RefInputEl) => {
        const inputRef = refs.current?.find(ref => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [fieldName, registerField]);

  return (
    <div>
      {label && <p>{label}</p>}

      {options.map((option, index) => (
        <span key={option.id}>
          <input
            type="radio"
            ref={inputRefs}
            id={option.id}
            name={name}
            defaultChecked={defaultValue.includes(option.id)}
            value={option.value}
            {...rest}
          />

          <label htmlFor={option.id} key={option.id}>
            {option.label}
          </label>
        </span>
      ))}
    </div>
  );
}
