import styled from "styled-components";

const Container = styled.header`
  height: var(--header-height);
  width: 100dvw;

  display: flex;
  align-items: center;

  padding: 1em 2em 1em 1em;

  background-color: #414141;
  box-shadow: 0px 4px 5px 3px #656565;
`;

const LinksContainer = styled.div`
  margin-right: 20px;
  font-size: 1.8em;
`;

export { Container, LinksContainer };
