// vendor imports
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 2em;
  right: 2em;

  width: 3em;
  height: 3em;

  font-size: 1em;
  line-height: 1em;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  user-select: none;
  cursor: pointer;

  background-color: rgb(42, 153, 187);

  transition: all 0.3s ease;
  transform-origin: center;

  &:hover {
    width: 4em;
    height: 4em;
    transform: translate(0.5em, 0.5em);
    background-color: rgb(69, 176, 209);
}
`;

export default Container;
