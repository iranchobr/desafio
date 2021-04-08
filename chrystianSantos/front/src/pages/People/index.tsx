import { FiCheckCircle, FiXCircle, FiEdit } from 'react-icons/fi';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { AiOutlineDelete } from 'react-icons/ai';
import { Container, Form, Table, ContainerButton } from './styles';
import { Input } from '../../component/Input';
import { CheckBox } from '../../component/CheckBox';
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

export function People() {
  const [peoples, setPeople] = useState<IDataPeople[]>([]);
  const [peopleSelect, setPeopleSelect] = useState<IDataPeople | null>(null);
  const [labelButton, setLabelButton] = useState<string>('Cadastrar');
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    async function getPeople() {
      const { data } = await api.get('/people');
      setPeople(data);
    }
    getPeople();
  }, []);

  const selectOptionsSex = [
    { value: 'f', label: 'Feminino' },
    { value: 'm', label: 'Masculino' },
  ];

  const handleFormSubmit = useCallback(
    async (dataPeople: IDataPeople, { reset }) => {
      const objForm = {
        name: dataPeople.name,
        active: dataPeople.active,
        email: dataPeople.email,
        endereco: dataPeople.endereco,
        sex: dataPeople.sex,
      };

      if (labelButton === 'Cadastrar') {
        try {
          const { data } = await api.post('/people', objForm);
          setPeople([...peoples, data]);
          reset();
          toast.success('Cadastrado com sucesso');
        } catch (error) {
          toast.error('Erro ao cadastrar pessoa, tente novamente');
        }
        return;
      }

      try {
        const { data } = await api.put(`/people/${peopleSelect?.id}`, objForm);

        const arrayChanged = peoples.filter(
          people => people.id !== peopleSelect?.id,
        );
        setPeople([...arrayChanged, data]);
        setPeopleSelect(null);
        setLabelButton('Cadastrar');
        reset();

        toast.success('Editado com sucesso');
      } catch (error) {
        toast.error('Erro ao editar pessoa, tente novamente');
      }
    },
    [peoples, labelButton, peopleSelect],
  );

  const handleDeletePeople = useCallback(
    async (id: string) => {
      try {
        const { data } = await api.delete(`/people/${id}`);
        if (data) {
          const peopleFind = peoples.filter(people => people.id !== id);
          setPeople(peopleFind);
        }
      } catch (error) {
        toast.error('Não foi possivel excluir tente novamente');
      }
    },
    [peoples],
  );

  const handleChangePeople = useCallback((people: IDataPeople) => {
    setPeopleSelect(people);
    setLabelButton('Editar');
  }, []);

  const handleResetForm = useCallback(() => {
    setPeopleSelect(null);
    setLabelButton('Cadastrar');
    formRef.current?.reset();
  }, []);

  return (
    <Container>
      <h1>Pessoas</h1>
      <Form
        ref={formRef}
        initialData={peopleSelect || {}}
        onSubmit={handleFormSubmit}
      >
        <div className="nameEmail">
          <Input
            id="name"
            nameInput="name"
            nameLabel="Nome"
            type="text"
            placeholder="Nome"
          />
          <Input
            id="email"
            nameInput="email"
            nameLabel="E-mail"
            type="email"
            placeholder="E-mail"
          />
        </div>
        <Input
          id="endereco"
          nameInput="endereco"
          nameLabel="Endereço"
          type="text"
          placeholder="Endereço"
        />
        <div className="sexActive">
          <div className="sex">
            <Select name="sex" label="Selecione o sexo">
              {selectOptionsSex.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="active">
            <CheckBox name="active" label="Ativo" />
          </div>
        </div>
        <ContainerButton>
          <button type="submit">{labelButton}</button>

          {peopleSelect && (
            <button type="button" onClick={handleResetForm}>
              Cancelar
            </button>
          )}
        </ContainerButton>
      </Form>
      {peoples.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">Endereco</th>
              <th scope="col">Sexo</th>
              <th scope="col">Ativo</th>
              <th scope="col">Editar/Deletar</th>
            </tr>
          </thead>
          <tbody>
            {peoples.map(people => (
              <tr key={people.id}>
                <th>{people.name}</th>
                <td>{people.email}</td>
                <td>{people.endereco}</td>
                <td>{people.sex === 'm' ? 'Masculino' : 'Feminino'}</td>
                <td>
                  {people.active ? (
                    <FiCheckCircle size="20" color="#2b961f" />
                  ) : (
                    <FiXCircle size="20" color="#bb2d3b" />
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleChangePeople(people)}
                    type="button"
                  >
                    <FiEdit size="20" color="#bb2d3b" />
                  </button>
                  <button
                    onClick={() => handleDeletePeople(people.id)}
                    type="button"
                  >
                    <AiOutlineDelete size="20" color="blue" />
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
