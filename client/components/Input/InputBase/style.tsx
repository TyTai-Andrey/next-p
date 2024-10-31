// vendor imports
import styled, { css } from "styled-components";

const Root = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.span<{
  $disabled?: boolean;
  $failed?: boolean;
  $focused?: boolean;
}>`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color:  grey;
  top: 12px;
  transform: translateY(-90%) translateX(10px);
  position: absolute;
  transform-origin: top left;
  transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;

  ${({ $focused }) => $focused && css`
    transform: translateY(-2em) translateX(10px) scale(0.75);
  `}

  ${({ $disabled }) => $disabled && css`
    color: grey;
  `}

  ${({ $failed }) => $failed && css`
      color: red;
  `}
`;

const Control = styled.label<{
  $failed?: boolean;
  $focused?: boolean;
}>`
  display: flex;
  align-items: center;
  height: 2.5em;
  padding: 12px 0;
  background-color: white;
  border-radius: 6px;
  cursor: text;
  position: relative;
  overflow: hidden;

  &::after {
      border-bottom: 1px solid;
      content: '';
      display: block;
      margin: 0 auto;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      transform: scaleX(0);
      transition: all 0.4s;
      width: 1%;
  }

  ${({ $focused }) => $focused && css`
    &::after {
      border-bottom: 1px solid black;
      transform: scaleX(150);
    }
  `}

  ${({ $failed }) => $failed && css`
    &::after {
      border-bottom: none;
    }
  `}
`;

const Error = styled.p`
  font-size: 10px;
  line-height: 14px;
  font-weight: 400;
  color: red;
`;

const Suffix = styled.div`
  margin: 5px 10px 0 0;
  color: black;
  cursor: pointer;
  user-select: none;
`;

const Wrapper = styled.div<{ $isLabel?: boolean }>`
  width: 100%;
  position: relative;

  ${({ $isLabel }) => $isLabel && css`
    padding-top: 22px - 12px;
    height: calc(100% - 7px);
  `}

  input {
    width: 100%;
    height: 100%;
    font-size: 1em;
    line-height: 20px;
    font-weight: 400;
    color: black;
    background-color: transparent;
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;

    padding: 10px 15px;
  }
`;

export {
  Control,
  Error,
  Label,
  Root,
  Suffix,
  Wrapper,
};
