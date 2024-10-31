// vendor imports
import styled, { css } from "styled-components";

// local imports
// components
import Select from "@components/Select";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
const StyledSelect = styled(Select) <{ $uninitialized?: boolean }>`
  ${({ $uninitialized }) => $uninitialized && css`
    position: relative;
    -webkit-filter: blur(10px) !important;
    filter: blur(2px) !important;
    opacity: 1;
  `}
`;

export {
  StyledSelect,
  Wrapper,
};
