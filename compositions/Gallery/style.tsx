// vendor imports
import styled, { css } from "styled-components";

import ImageNext from "next/image";

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  width: 100%;

  position: relative;
  margin: 1em 0;
`;

const GalleryLine = styled.div<{ currentScreenshotIdx: number, count: number }>`
  display: flex;
  flex-wrap: nowrap;
  width: ${({ count }) => `calc(calc(100% - 2em) * ${count})`};
  width: 100%;

  translate: ${({ currentScreenshotIdx }) => `calc(-100% * ${currentScreenshotIdx})`};

  height: 500px;
`;

const Image = styled(ImageNext)`
  width: 100%;
  object-fit: cover;
  pointer-events: none;
  height: auto;
  flex-shrink: 0;
  object-fit: cover;
  object-position: center;
`;

const Window = styled.div`
  overflow: hidden;
  width: 100%;
`;

const Button = styled.button<{ right?: boolean; left?: boolean; }>`
  position: absolute;
  z-index: 10;
  border: 1px solid #fff;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 1.2em;
  font-weight: 700;
  line-height: 0;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1.8em;
  height: 1.8em;
  color: black;
  cursor: pointer;

  &:disabled {
    border: 1px solid #ccc;
    color: #ccc;
    background-color: rgba(85, 85, 85, 0.5);
  }

  @media (min-width: 580px) {
    width: 2em;
    height: 2em;
  }

  ${({ left }) => left && css`left: 10px;`};
  ${({ right }) => right && css`right: 10px;`};
`;

export {
  Button,
  Container,
  GalleryLine,
  Image,
  Window,
};
