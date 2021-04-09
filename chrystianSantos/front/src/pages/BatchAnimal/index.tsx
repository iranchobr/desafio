import { FormHandles } from '@unform/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import { parseISO } from 'date-fns';
import { FiCheckCircle, FiEdit, FiXCircle } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { CheckBox } from '../../component/CheckBox';
import { Input } from '../../component/Input';
import { Select } from '../../component/Select';
import { api } from '../../services/api';
import { Container, Form, ContainerButton, Table } from './styles';

interface IAnimal {
  id: string;
  name: string;
  id_people: string;
  breed: string;
  sex: 'm' | 'f';
  weigth: number;
  born: string;
}

interface IBatch {
  id: string;
  name: string;
  description: string;
}

interface IBatchAnimal {
  id: string;
  dt_entry: string;
  dt_exit: string;
  dt_last_movement: string;
  calf: boolean;
  animal: {
    name: string;
    breed: string;
    sex: string;
    weigth: string;
    born: string;
  };
  batch: {
    name: string;
  };
}

interface IFormBatchAnimal {
  dtEntry: string;
  dtExit: string;
  dtLastMove: string;
  haveCalf: boolean;
  id_batch: string;
  id_animal: string;
}

export function BatchAnimal() {
  const formRef = useRef<FormHandles>(null);
  const [labelButton, setLabelButton] = useState<string>('Cadastrar');
  const [
    batchAnimalSelect,
    setAnimalBatchSelect,
  ] = useState<IBatchAnimal | null>(null);
  const [batchAnimals, setBatchAnimals] = useState<IBatchAnimal[]>([]);

  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [batchs, setBatchs] = useState<IBatch[]>([]);

  useEffect(() => {
    async function getAnimalAndBatch() {
      const [animalsList, batchList, batchAnimalsList] = await Promise.all([
        api.get('/animal'),
        api.get('/batch'),
        api.get('/animal_batch'),
      ]);

      setAnimals(animalsList.data);
      setBatchs(batchList.data);
      setBatchAnimals(batchAnimalsList.data);
    }
    getAnimalAndBatch();
  }, []);

  const handleFormSubmit = useCallback(
    async (formBatchAnimal: IFormBatchAnimal, { reset }) => {
      if (labelButton) {
        try {
          const objSave = {
            id_animal: formBatchAnimal.id_animal,
            id_batch: formBatchAnimal.id_batch,
            dt_entry: parseISO(formBatchAnimal.dtEntry),
            dt_exit: parseISO(formBatchAnimal.dtExit),
            calf: formBatchAnimal.haveCalf,
          };
          const { data } = await api.post('/animal_batch', objSave);
          setBatchAnimals([...batchAnimals, data]);
          toast.success('Animal x lote cadastrado com sucesso');
          reset();
        } catch (error) {
          toast.error('Não foi possível cadastrar o animal x lote');
        }
      }
      console.log(formBatchAnimal);
    },
    [batchAnimals, labelButton],
  );

  const handleDeleteBatchAnimal = useCallback(
    async (idBatchAnimal: string) => {
      try {
        await api.delete(`/animal_batch/${idBatchAnimal}`);
        const newArrayBatchAnimal = batchAnimals.filter(
          batchAnimal => batchAnimal.id !== idBatchAnimal,
        );
        setBatchAnimals(newArrayBatchAnimal);
        toast.success('Lote deletado com sucesso');
      } catch (error) {
        toast.error('Ocorreu um problema ao deletar lote, tente novamente');
      }
    },
    [batchAnimals],
  );

  const handleResetForm = useCallback(() => {
    setAnimalBatchSelect(null);
    setLabelButton('Cadastrar');
    formRef.current?.reset();
  }, []);

  return (
    <Container>
      <h1>Animal x Lote</h1>
      <Form
        ref={formRef}
        initialData={batchAnimalSelect || {}}
        onSubmit={handleFormSubmit}
      >
        <div className="animalBreed">
          <Select name="id_animal" label="Selecione o animal">
            {animals.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>

          <Select name="id_batch" label="Selecione o lote">
            {batchs.map(option => (
              <option key={option.id} value={option.id}>
                {option.name}
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

        <ContainerButton>
          <button type="submit">{labelButton}</button>

          {batchAnimalSelect && (
            <button type="button" onClick={handleResetForm}>
              Cancelar
            </button>
          )}
        </ContainerButton>
      </Form>
      {batchAnimals.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th scope="col">Nome lote</th>
              <th scope="col">Nome do animal</th>
              <th scope="col">Raça</th>
              <th scope="col">Peso</th>
              <th scope="col">Nascimento</th>
              <th scope="col">Possui bezerro</th>
              <th scope="col">Deletar</th>
            </tr>
          </thead>
          <tbody>
            {batchAnimals.map(batchAnimal => (
              <tr key={batchAnimal.id}>
                <th>{batchAnimal.batch.name}</th>
                <td>{batchAnimal.animal.name}</td>
                <td>{batchAnimal.animal.breed}</td>
                <td>{batchAnimal.animal.weigth}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-br').format(
                    new Date(batchAnimal.animal.born),
                  )}
                </td>
                <td>
                  {batchAnimal.calf ? (
                    <FiCheckCircle size="20" />
                  ) : (
                    <FiXCircle size="20" />
                  )}
                </td>

                <td>
                  {/* <button
                    onClick={() => handleChangeAnimalBatch(batchAnimal)}
                    type="button"
                  >
                    <FiEdit size="20" />
                  </button> */}
                  <button
                    onClick={() => handleDeleteBatchAnimal(batchAnimal.id)}
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
