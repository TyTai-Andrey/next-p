// vendor imports
import styled from "styled-components";

// local imports
// components
import InputBase from "@components/Input/InputBase";

const StyledInputBase = styled(InputBase)`
  width: 100%;
  position: relative;

  input {
    width: 100%;
    height: 100%;
    line-height: 20px;
    font-weight: 400;
    color: black;
    background-color: transparent;
    margin: 0;
    border: 0;
    outline: 0;
    pointer-events: auto;
    position: relative;
    top: 0.1rem;
  }
`;

const SelectInput = styled.input`
  display: none;
`;

const TextInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: black;
  background-color: transparent;
  margin: 0;
  border: 0;
  outline: 0;
  pointer-events: auto;
  position: relative;
  top: -0.3rem;
  padding: 0.3rem;
`;

const DropdownWrapper = styled.div`
  height: 250px;
  padding: 4px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(17, 82, 99, 0.15);
  z-index: 5000;
  margin: 0;
`;

const Chevron = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 50%;

  i {
    font-size: 20px;
  }
`;

export {
  Chevron,
  DropdownWrapper,
  SelectInput,
  StyledInputBase,
  TextInput,
};
