import { FormHandles } from '@unform/core';
import { useCallback, useRef } from 'react';
import { Input } from '../../component/Input';
import { Container, Form } from './styles';
import { Select } from '../../component/Select';

export function Animal() {
  const formRef = useRef<FormHandles>(null);

  const selectOptions = [
    { value: '1', label: 'Chrystian' },
    { value: '2', label: 'Livia' },
    { value: '3', label: 'Catia' },
  ];

  const selectSexOption = [
    { value: 'F', label: 'Feminino' },
    { value: 'M', label: 'Masculino' },
  ];

  const handleSubmit = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <Container>
      <h1>Animal</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Select name="pessoa" label="Selecione a pessoa">
          {selectOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <div className="nameBreed">
          <Input
            id="nameAnimal"
            nameInput="nameAnimal"
            nameLabel="Nome animal"
            type="text"
            placeholder="Nome animal"
          />
          <Input
            id="nameBreed"
            nameInput="nameBreed"
            nameLabel="Raça"
            type="text"
            placeholder="Raça"
          />
        </div>

        <div className="sexWeigthBirth">
          <Select name="sex" label="Selecione o sexo">
            {selectSexOption.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Input
            id="weight"
            nameInput="weight"
            nameLabel="Peso"
            type="number"
            placeholder="Peso"
          />
          <Input
            id="dtBirth"
            nameInput="dtBirth"
            nameLabel="Data nascimento"
            type="date"
            placeholder="Data de nascimento"
          />
        </div>
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
