import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes';
import { Header } from './component/Header';
import GlobalStyle from './styles/Global';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <div style={{ display: 'flex' }}>
          <Header />
          <Routes />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
