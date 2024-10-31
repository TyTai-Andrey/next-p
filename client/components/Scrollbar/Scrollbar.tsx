// react
import React from "react";

// local imports
// components
import Root from "./style";

export interface ScrollbarProps {
  children?: React.ReactNode;
  onScroll?: (event: React.UIEvent) => void;
}

const Scrollbar: React.FC<ScrollbarProps> = ({
  children,
  onScroll,
}) => {
  const $scrollableNode = React.useRef<any>(null);
  React.useEffect(() => {
    if (onScroll && $scrollableNode.current) {
      $scrollableNode.current.addEventListener("scroll", onScroll);
    }

    return () => $scrollableNode.current &&
      $scrollableNode.current.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <Root ref={$scrollableNode}>
      {children}
    </Root>
  );
};

export default React.memo(Scrollbar);
