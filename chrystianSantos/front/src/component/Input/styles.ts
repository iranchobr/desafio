import styled from 'styled-components';

export const Container = styled.div`
  display: grid;

  label {
    opacity: 0.5;
    font-size: 15px;
  }
  input {
    padding: 10px;
    border-radius: 4px;
    flex: 1;
    width: 100%;
    margin-top: 10px;
    border: 0;
    background-color: transparent;
    border-bottom: 1px solid #aaa;
    font-size: 21px;

    :focus {
      border: 1px solid #aaa;
    }
  }
`;
