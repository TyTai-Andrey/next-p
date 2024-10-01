import styled from "styled-components";

const H1 = styled.h1<{ noWrap?: boolean }>`
  font-size: 2em;
  white-space: ${({ noWrap }) => noWrap && "nowrap"};
`;

export default H1;
