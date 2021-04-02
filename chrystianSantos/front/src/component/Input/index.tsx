import { Container } from './styles';

interface IInputProps {
  id: string;
  value?: string;
  type: string;
  nameInput: string;
  nameLabel: string;
  placeholder?: string;
}

export function Input({
  id,
  nameInput,
  nameLabel,
  type,
  value = '',
  placeholder = '',
}: IInputProps) {
  return (
    <Container>
      <label htmlFor={id}>{nameLabel}</label>
      <input
        type={type}
        name={nameInput}
        id={id}
        placeholder={placeholder}
        // value={value}
      />
    </Container>
  );
}
