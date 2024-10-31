// vendor imports
import styled, { css } from "styled-components";

const Root = styled.li<{
  $selected?: boolean;
  $disabled?: boolean;
}>`
  min-height: 28px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1px 0 1px 11px;
  background-color: transparent;
  cursor: pointer;
  border-radius: 4px;
  box-sizing: border-box;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #000000dd;

  background-color: #80808013;

  ${({ $selected }) => $selected && css`
    background-color: #80808034;
  `}

  ${({ $disabled }) => $disabled && css`
    pointer-events: none;
    cursor: auto;
    color: #0000007b;
  `}
`;

export default Root;
