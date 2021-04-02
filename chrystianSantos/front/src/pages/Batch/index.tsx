import { FiCheckCircle, FiDelete, FiEdit } from 'react-icons/fi';
import { Input } from '../../component/Input';
import { Container, Form, Table } from './styles';

export function Batch() {
  return (
    <Container>
      <h1>Lotes</h1>
      <Form>
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
