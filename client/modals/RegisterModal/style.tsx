// vendor imports
import styled from "styled-components";

// next
import NextLink from "next/link";

// local imports
// components
import H1 from "@components/Texts";
import Input from "@components/Input";

const Text = styled.p`
  color: black;
  font-size: 1.3em;

  margin: 5px 3px;
`;

const Buttons = styled.div`
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: flex-end;

`;

const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;

  padding: 10px 15px;
  font-size: 1.3em;
  margin-left: auto;
`;

const Link = styled(NextLink)`
  color: #38b2f8;
  font-size: 1.3em;
`;

const StyledInput = styled(Input)`
  background-color: #8080801c;
  margin: 10px 0 3px;
  font-size: 1.3em;
`;

const StyledH1 = styled(H1)`
  color: black;
`;

const Error = styled.p`
  color: red;
  font-size: 1.1em;
  line-height: 1.1em;
  margin: 5px 3px;
`;

export {
  Button,
  Buttons,
  Error,
  Link,
  StyledH1,
  StyledInput,
  Text,
};
