// vendor imports
import styled from "styled-components";

const Wrapper = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 4999;
`;

const Dots = styled.div`
  width: 9.6px;
  height: 9.6px;
  background: #474bff;
  color: #474bff;
  border-radius: 50%;
  box-shadow: 16px 0,-16px 0;
  animation: dots 1.2s infinite linear alternate;

  @keyframes dots {
    0% {
      box-shadow: 16px 0,-16px 0;
      background: inherit;
    }

    33% {
      box-shadow: 16px 0,-16px 0 rgba(71,75,255,0.13);
      background: rgba(71,75,255,0.13);
    }

    66% {
      box-shadow: 16px 0 rgba(71,75,255,0.13),-16px 0;
      background: rgba(71,75,255,0.13);
    }
  }
`;

export { Dots, Wrapper };
