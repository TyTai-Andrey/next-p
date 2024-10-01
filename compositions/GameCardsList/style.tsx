import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    width: 100%;
  }
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }

  @media (min-width: 580px) {
    display: grid;
    grid-template-columns: repeat(2, 49%);
    grid-column-gap: 2%;
    grid-row-gap: 0.4em;
  }
  @media (min-width: 1040px) {
    display: grid;
    grid-template-columns: repeat(3, 32.5%);
    grid-column-gap: 1.25%;
    grid-row-gap: 0.4em;
  }
`;

export default Container;
