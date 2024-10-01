import styled from "styled-components";

const Space = styled.div`
  display: -webkit-inline-box;

  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;
const SpaceBetween = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const SpaceColumn = styled.div`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export {
  Space,
  SpaceBetween,
  SpaceColumn,
};
