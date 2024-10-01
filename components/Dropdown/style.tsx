import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const DropdownList = styled.ul`
  width: 100%;
  min-height: 10px;
  max-height: 200px;
  overflow: auto;

  position: absolute;
  z-index: 100;

  background-color: #fff;
  color: #000;

  list-style: none;

  border-top: 1px solid #000;

  & > li {
    padding: 5px 10px;
    font-size: 1em;
    cursor: pointer;

    &:hover {
      background-color: #ffe;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #ccc;
    }
  }
`;

export { Container, DropdownList };
