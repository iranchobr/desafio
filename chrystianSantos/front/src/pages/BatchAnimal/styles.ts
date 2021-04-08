import styled from 'styled-components';
import { Form as FormUnform } from '@unform/web';

export const Container = styled.div`
  flex: 1;
  background-color: #eee;
  h1 {
    margin: 30px;
  }
  max-height: 100vh;
  overflow: auto;
`;

export const Form = styled(FormUnform)`
  margin: 50px;
  .animalBreed {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 50px;
  }
  .abacaxi {
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 50px;
  }

  .inputCheck {
    display: flex;
    margin-top: 50px;
    justify-content: center;
  }
  button {
    margin-top: 20px;
    margin-left: 85%;
    background-color: #92a42a;
    padding: 10px 15px;
    border: 0;
    border-radius: 4px;
    color: #fff;
    font-weight: 600;
    transition: background-color 0.3s;

    &:hover {
      background-color: rgb(83, 61, 22);
    }
  }
`;

export const Table = styled.table`
  width: 100%;

  table {
    border-collapse: collapse;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    text-align: center;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
    text-align: center;
  }

  button {
    border: 0;
    background-color: transparent;
    svg {
      margin-left: 5px;
    }
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  button + button {
    margin-left: 20px;
  }
`;
