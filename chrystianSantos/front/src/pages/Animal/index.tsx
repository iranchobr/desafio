import { FormHandles } from '@unform/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { parseISO } from 'date-fns';
import { Input } from '../../component/Input';
import { Container, Form, Table, ContainerButton } from './styles';
import { Select } from '../../component/Select';
import { api } from '../../services/api';

interface IDataPeople {
  id: string;
  name: string;
  active: boolean;
  email: string;
  endereco: string;
  sex: 'm' | 'f';
}

interface IDataAnimal {
  id: string;
  name: string;
  id_people: string;
  breed: string;
  sex: 'm' | 'f';
  weigth: number;
  born: string;
  people: {
    name: string;
  };
}

export function Animal() {
  const formRef = useRef<FormHandles>(null);
  const [peoples, setPeoples] = useState<IDataPeople[]>([]);
  const [animals, setAnimals] = useState<IDataAnimal[]>([]);
  const [labelButton, setLabelButton] = useState<string>('Cadastrar');
  const [animalSelect, setAnimalsSelect] = useState<IDataAnimal | null>(null);
  useEffect(() => {
    async function getPeople() {
      const [peoplesList, animalsList] = await Promise.all([
        await api.get<IDataPeople[]>('/people'),
        await api.get<IDataAnimal[]>('/animal'),
      ]);
      setPeoples(peoplesList.data);
      setAnimals(animalsList.data);
    }
    getPeople();
  }, []);

  const selectSexOption = [
    { value: 'f', label: 'Fêmea' },
    { value: 'm', label: 'Macho' },
  ];

  const handleSubmit = useCallback(
    async (animalData: IDataAnimal, { reset }) => {
      const objSave = {
        name: animalData.name,
        id_people: animalData.id_people,
        breed: animalData.breed,
        sex: animalData.sex,
        weigth: Number(animalData.weigth),
        born: parseISO(animalData.born),
      };

      if (labelButton === 'Cadastrar') {
        try {
          const { data } = await api.post('/animal', objSave);
          setAnimals([...animals, data]);
          reset();
          toast.success('Animal salvo com sucesso !');
        } catch (error) {
          toast.error('Ocorreu um erro ao salvar animal, tente novamente');
        }
        return;
      }
      try {
        const { data } = await api.put(`/animal/${animalSelect?.id}`, objSave);
        const newArrAnimal = animals.filter(
          animal => animal.id !== animalSelect?.id,
        );
        setAnimals([...newArrAnimal, data]);
        reset();
        toast.success('Animal editado com sucesso');
      } catch (error) {
        toast.error('Não foi possivel atualizar o animal, tente novamente');
      }
    },
    [animals, labelButton, animalSelect],
  );

  const handleDeleteAnimal = useCallback(
    async (idAnimal: string) => {
      try {
        await api.delete(`/animal/${idAnimal}`);
        const newArrAnimal = animals.filter(animal => animal.id !== idAnimal);
        setAnimals(newArrAnimal);
        toast.success('Animal deletado com sucesso !');
      } catch (error) {
        toast.error('Erro ao deletar animal, tente novamente');
      }
    },
    [animals],
  );

  const handleChangeAnimal = useCallback((animal: IDataAnimal) => {
    setLabelButton('Editar');
    setAnimalsSelect(animal);
  }, []);

  const handleResetForm = useCallback(() => {
    setAnimalsSelect(null);
    setLabelButton('Cadastrar');
    formRef.current?.reset();
  }, []);

  return (
    <Container>
      <h1>Animal</h1>

      <Form
        ref={formRef}
        initialData={animalSelect || {}}
        onSubmit={handleSubmit}
      >
        <Select name="id_people" label="Selecione a pessoa">
          {peoples.map(option => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
        <div className="nameBreed">
          <Input
            id="nameAnimal"
            nameInput="name"
            nameLabel="Nome animal"
            type="text"
            placeholder="Nome animal"
          />
          <Input
            id="nameBreed"
            nameInput="breed"
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
            nameInput="weigth"
            nameLabel="Peso"
            type="number"
            placeholder="Peso"
          />
          <Input
            id="dtBirth"
            nameInput="born"
            nameLabel="Data nascimento"
            type="date"
            placeholder="Data de nascimento"
          />
        </div>
        <ContainerButton>
          <button type="submit">{labelButton}</button>

          {animalSelect && (
            <button type="button" onClick={handleResetForm}>
              Cancelar
            </button>
          )}
        </ContainerButton>
      </Form>
      {animals.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Raça</th>
              <th scope="col">Peso</th>
              <th scope="col">Nascimento</th>
              <th scope="col">Nome pessoa</th>
              <th scope="col">Editar/Deletar</th>
            </tr>
          </thead>
          <tbody>
            {animals.map(animal => (
              <tr key={animal.id}>
                <th>{animal.name}</th>
                <td>{animal.breed}</td>
                <td>{animal.weigth}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-br').format(
                    new Date(animal.born),
                  )}
                </td>
                <td>{animal.people?.name || 'Pessoa removida da base'}</td>
                <td>
                  <button
                    onClick={() => handleChangeAnimal(animal)}
                    type="button"
                  >
                    <FiEdit size="20" />
                  </button>
                  <button
                    onClick={() => handleDeleteAnimal(animal.id)}
                    type="button"
                  >
                    <AiOutlineDelete size="20" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
