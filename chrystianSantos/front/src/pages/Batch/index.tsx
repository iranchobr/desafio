import { useCallback, useRef } from 'react';
import { FiCheckCircle, FiDelete, FiEdit } from 'react-icons/fi';
import { Input } from '../../component/Input';
import { Container, Form, Table } from './styles';

interface IBatchProps {
  name: string;
  description: string;
}

export function Batch() {
  const formRef = useRef(null);

  const handleFormSubmit = useCallback((data: IBatchProps) => {
    console.log(data);
  }, []);

  return (
    <Container>
      <h1>Lotes</h1>
      <Form ref={formRef} onSubmit={handleFormSubmit}>
        <div className="nameDescription">
          <Input id="name" nameInput="name" nameLabel="Nome" type="text" />
          <Input
            id="description"
            nameInput="description"
            nameLabel="Descrição"
            type="text"
          />
        </div>
        <button type="submit">Cadastrar</button>
      </Form>

      <Table>
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Editar/Deletar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Boi brabo</th>
            <td>So os boi mais brabo</td>
            <td>
              <button type="button">
                <FiEdit size="20" />
              </button>
              <button type="button">
                <FiDelete size="20" />
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
