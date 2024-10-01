// vendor imports
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 2em;
  right: 2em;

  width: 3em;
  height: 3em;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  user-select: none;

  background-color: rgba(0, 0, 0, 0.6);
`;

export default Container;
