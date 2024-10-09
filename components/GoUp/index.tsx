// react
import {
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";

// local imports
// components
import Container from "./style";

interface GoUpProps {
  elem?: HTMLElement;
}

const GoUp: FC<GoUpProps> = ({ elem = document.documentElement }) => {
  const [isVisibleUp, setIsVisibleUp] = useState(false);

  const onClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setIsVisibleUp(false);

    elem.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [elem]);

  useEffect(() => {
    const scrollHandler = () => {
      const rect = document?.documentElement?.getBoundingClientRect();
      const windowRelativeTop = Math.abs(rect?.top || 0);

      setIsVisibleUp(windowRelativeTop >= 1500);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return isVisibleUp && <Container onClick={onClickHandler}>UP</Container>;
};

export default GoUp;
