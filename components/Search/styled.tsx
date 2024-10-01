import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Clear = styled.div`
  position: absolute;
  top: 0;
  right: 10px;

  height: 100%;
  width: 1.5rem;

  display: flex;
  align-items: center;

  cursor: pointer;
  user-select: none;
  
  &:before {
    content: "✕";
  
    position: relative;
  
    font-size: 1.5em;
    color: #000;
  }  
`;

export { Clear, Container };
