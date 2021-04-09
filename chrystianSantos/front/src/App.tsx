import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Routes } from './routes';
import { Header } from './component/Header';
import GlobalStyle from './styles/Global';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <div style={{ display: 'flex' }}>
          <Header />
          <Routes />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
