import { FiCheckCircle, FiXCircle, FiEdit, FiDelete } from 'react-icons/fi';
import { Container, Form, Table } from './styles';
import { Input } from '../../component/Input';

export function People() {
  return (
    <Container>
      <h1>Pessoas</h1>

      <Form>
        <div className="nameEmail">
          <Input id="name" type="text" nameInput="name" nameLabel="Nome" />
          <Input id="email" type="email" nameInput="email" nameLabel="E-mail" />
        </div>
        <Input
          id="endereco"
          type="email"
          nameInput="Endereco"
          nameLabel="Endereco"
        />
        <div className="sexActive">
          <div className="sex">
            <label htmlFor="fem">Sexo</label>
            <label htmlFor="fem">
              <input type="radio" name="sex" value="Fem" id="fem" />
              Feminino
            </label>
            <label htmlFor="mas">
              <input type="radio" name="sex" value="Mas" id="mas" />
              Masculino
            </label>
          </div>
          <div className="active">
            <input type="checkbox" id="active" name="active" />
            <label htmlFor="active">Ativo</label>
          </div>
        </div>
        <button type="button">Cadastrar</button>
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
