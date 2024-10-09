// react
import { FC, useCallback } from "react";

// local imports
// components
import Container from "./style";

interface GoUpProps {
  elem?: HTMLElement;
  isVisibleUp?: boolean;
}

const GoUp: FC<GoUpProps> = ({ elem = document.documentElement, isVisibleUp }) => {
  const onClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    elem.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [elem]);

  return isVisibleUp && <Container onClick={onClickHandler}>UP</Container>;
};

export default GoUp;
