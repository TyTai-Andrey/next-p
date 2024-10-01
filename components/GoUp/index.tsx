import { FC } from "react";

// components
import Container from "./style";

interface GoUpProps {
  elem?: HTMLElement;
  isVisibleUp?: boolean;
}

const GoUp: FC<GoUpProps> = ({ elem = document.documentElement, isVisibleUp }) => {
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    elem.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return isVisibleUp && <Container onClick={onClickHandler}>UP</Container>;
};

export default GoUp;
