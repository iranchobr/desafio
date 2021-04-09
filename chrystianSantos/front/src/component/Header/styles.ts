import styled from 'styled-components';
import LogoRancho from '../../assets/images/wallpaperRancho.jpeg';

export const Container = styled.div`
  width: 400px;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: center;
  background-image: url(${LogoRancho});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  ul {
    margin: auto;
    list-style: none;
    padding-top: 420px;
    li {
      a {
        display: block;
        padding: 10px;
        color: #387332;
        font-weight: 700;
        font-size: 20px;
        text-align: center;
        background-color: rgba(194, 195, 96, 1);
        border-radius: 4px;
        transition: color 0.5s;

        &:hover {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
    li + li {
      margin-top: 7px;
    }
  }
`;
