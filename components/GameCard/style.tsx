// next imports
import ImageNext from "next/image";
import LinkNext from "next/link";

// vendor imports
import styled, { css } from "styled-components";

// components
import H1 from "@components/H1";
import { SpaceBetween } from "@components/Space";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  overflow: hidden;

  position: relative;
`;

const Info = styled.div<{ noPadding?: boolean }>`
  box-sizing: content-box;

  position: absolute;
  bottom: 10px;
  padding: 0.5em;

  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
  font-size: 1.2em;

  width: calc(100% - 1em);
`;

const Image = styled(ImageNext) <{ minHeightImage?: number; noimg?: string }>`
  width: 100%;
  object-fit: cover;
  pointer-events: none;

  ${({ minHeightImage }) => minHeightImage && css`
    height: auto;
    min-height: ${minHeightImage}px;
    max-height: 600px;
    object-position: top;
  `};
  ${({ minHeightImage, noimg }) => noimg && minHeightImage && css`
    object-position: center;
    object-fit: contain;
  `};
`;

const Link = styled(LinkNext)`
  display: block;
  font-size: 2em;

  transition: color 0.5s ease;

  &:hover {
    color: #53e9f4;
  }
`;

const StyledH1 = styled(H1)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledSpaceBetween = styled(SpaceBetween)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export {
  Container,
  Image,
  Info,
  Link,
  StyledH1,
  StyledSpaceBetween,
};
