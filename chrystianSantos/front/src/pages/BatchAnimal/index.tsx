import { FormHandles } from '@unform/core';
import { useCallback, useRef } from 'react';
import { CheckBox } from '../../component/CheckBox';
import { Input } from '../../component/Input';
import { Select } from '../../component/Select';
import { Container, Form } from './styles';

export function BatchAnimal() {
  const formRef = useRef<FormHandles>(null);

  const handleFormSubmit = useCallback((data: any, { resert }) => {
    console.log(data);
  }, []);

  const selectOptions = [
    { value: 'F', label: 'Feminino' },
    { value: 'M', label: 'Masculino' },
  ];

  return (
    <Container>
      <h1>Animal x Lote</h1>
      <Form ref={formRef} onSubmit={handleFormSubmit}>
        <div className="animalBreed">
          <Select name="idAnimal" label="Selecione o animal">
            {selectOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select name="idBreed" label="Selecione o lote">
            {selectOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="abacaxi">
          <Input
            id="dtEntry"
            nameInput="dtEntry"
            nameLabel="Data de entrada"
            type="date"
            placeholder="Data de entrada"
          />
          <Input
            id="dtExit"
            nameInput="dtExit"
            nameLabel="Data saída"
            type="date"
            placeholder="Data de saída"
          />
          <Input
            id="dtLastMove"
            nameInput="dtLastMove"
            nameLabel="Data ultima movimentação"
            type="date"
            placeholder="Data ultima movimentação"
          />
        </div>
        <div className="inputCheck">
          <CheckBox name="haveCalf" label="Tem bezerro" />
        </div>

        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
