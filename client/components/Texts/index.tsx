// vendor imports
import styled, { css } from "styled-components";

type H1Props = { noWrap?: boolean }
const H1 = styled.h1<H1Props>`
  font-size: 2em;
  ${({ noWrap }) => noWrap && css`white-space: nowrap;`};
`;

export default H1;
