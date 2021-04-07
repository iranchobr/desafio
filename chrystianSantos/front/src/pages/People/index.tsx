import { FiCheckCircle, FiXCircle, FiEdit, FiDelete } from 'react-icons/fi';
import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { Container, Form, Table } from './styles';
import { Input } from '../../component/Input';
import { CheckBox } from '../../component/CheckBox';
import { Select } from '../../component/Select';
import { api } from '../../services/api';

export function People() {
  const formRef = useRef<FormHandles>(null);

  const selectOptionsSex = [
    { value: 'F', label: 'Feminino' },
    { value: 'M', label: 'Masculino' },
  ];

  const handleFormSubmit = useCallback((data: any, { reset }) => {
    // api.post('',data})
    // reset();
    toast.success('Cadastrado com sucesso');
  }, []);

  return (
    <Container>
      <h1>Pessoas</h1>

      <Form ref={formRef} onSubmit={handleFormSubmit}>
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
          nameInput="Endereço"
          nameLabel="Endereço"
          type="text"
          placeholder="Endereço"
        />
        <div className="sexActive">
          <div className="sex">
            <Select name="sexo" label="Selecione o sexo">
              {selectOptionsSex.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="active">
            <CheckBox name="ativo" label="Ativo" />
          </div>
        </div>
        <button type="submit">Cadastrar</button>
      </Form>

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
          <tr>
            <th>Chrystian</th>
            <td>chrystian@gmail.com</td>
            <td>Rua 27 numero 302</td>
            <td>Masculino</td>
            <td>
              <FiCheckCircle size="20" />
            </td>
            <td>
              <button type="button">
                <FiEdit size="20" />
              </button>
              <button type="button">
                <FiDelete size="20" />
              </button>
            </td>
          </tr>
          <tr>
            <th>Livia</th>
            <td>livia@gmail.com</td>
            <td>Rua 27 numero 302</td>
            <td>Feminio</td>
            <td>
              <FiXCircle />
            </td>
            <td>
              <FiDelete />
              <FiEdit />
            </td>
          </tr>
          <tr>
            <th>Livia</th>
            <td>livia@gmail.com</td>
            <td>Rua 27 numero 302</td>
            <td>Feminio</td>
            <td>
              <FiXCircle />
            </td>
            <td>
              <FiDelete />
              <FiEdit />
            </td>
          </tr>
          <tr>
            <th>Livia</th>
            <td>livia@gmail.com</td>
            <td>Rua 27 numero 302</td>
            <td>Feminio</td>
            <td>
              <FiXCircle />
            </td>
            <td>
              <FiDelete />
              <FiEdit />
            </td>
          </tr>
          <tr>
            <th>Livia</th>
            <td>livia@gmail.com</td>
            <td>Rua 27 numero 302</td>
            <td>Feminio</td>
            <td>
              <FiXCircle />
            </td>
            <td>
              <FiDelete />
              <FiEdit />
            </td>
          </tr>
          <tr>
            <th>Livia</th>
            <td>livia@gmail.com</td>
            <td>Rua 27 numero 302</td>
            <td>Feminio</td>
            <td>
              <FiXCircle />
            </td>
            <td>
              <FiDelete />
              <FiEdit />
            </td>
          </tr>
          <tr>
            <th>Livia</th>
            <td>livia@gmail.com</td>
            <td>Rua 27 numero 302</td>
            <td>Feminio</td>
            <td>
              <FiXCircle />
            </td>
            <td>
              <FiDelete />
              <FiEdit />
            </td>
          </tr>
          <tr>
            <th>Livia</th>
            <td>livia@gmail.com</td>
            <td>Rua 27 numero 302</td>
            <td>Feminio</td>
            <td>
              <FiXCircle />
            </td>
            <td>
              <FiDelete />
              <FiEdit />
            </td>
          </tr>
          <tr>
            <th>Livia</th>
            <td>livia@gmail.com</td>
            <td>Rua 27 numero 302</td>
            <td>Feminio</td>
            <td>
              <FiXCircle />
            </td>
            <td>
              <FiDelete />
              <FiEdit />
            </td>
          </tr>
          <tr>
            <th>Livia</th>
            <td>livia@gmail.com</td>
            <td>Rua 27 numero 302</td>
            <td>Feminio</td>
            <td>
              <FiXCircle />
            </td>
            <td>
              <FiDelete />
              <FiEdit />
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
