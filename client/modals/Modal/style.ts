import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  background-color: white;
  z-index: 2;
  border-radius: 12px;

  /* &.large {
    width: 920px;
    height: 640px;
  }

  .medium {
    width: 944px;
    height: 516px;
  }

  &.small {
    width: 520px;
    height: 240px;
  } */
`;

const Close = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  border: 0;
  outline: 0;
  margin: 0;
  padding: 0;
  text-decoration: none;
  white-space: nowrap;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 2em;
  height: 2em;
  background-color: rgba(161, 161, 161, 0.8);
  border-radius: 100%;

  i {
    font-size: 1.3em;
  }
`;

export {
  Backdrop,
  Close,
  Container,
  Content,
};
