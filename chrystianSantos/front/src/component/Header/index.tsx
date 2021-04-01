import { Link } from 'react-router-dom';
import { Container } from './styles';

export function Header() {
  return (
    <Container>
      <ul>
        <li>
          <Link to="/">Pessoa </Link>
        </li>
        <li>
          <Link to="/animal">Animal</Link>
        </li>
        <li>
          <Link to="/batch">Lote</Link>
        </li>
        <li>
          <Link to="/batch_animal">Animal x lote</Link>
        </li>
      </ul>
    </Container>
  );
}
