// react
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Portal } from "react-portal";

// local imports
// utils
import cloneReferencedElement from "@utils/cloneReferencedElement";
import getPosition from "@utils/getPosition";

const PositionTypes = [
  "top right",
  "top left",
  "right top",
  "right bottom",
  "bottom right",
  "bottom left",
  "left top",
  "left bottom",
] as const;

interface DropdownProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

interface Options {
  ref: React.RefObject<any>;
  position?: PositionType;
  onOpen?: () => void;
  onClose?: () => void;
  offsetX?: number;
  offsetY?: number;
  closeOnClickOutside?: boolean;
  placementStyle?: "absolute" | "fixed";
}

type PositionType = typeof PositionTypes[number];

interface Return {
  Dropdown: React.FC<DropdownProps>;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useDropdown = ({
  closeOnClickOutside = true,
  offsetX = 0,
  offsetY = 0,
  onClose,
  onOpen,
  placementStyle = "absolute",
  position = PositionTypes[0],
  ref: $trigger,
}: Options): Return => {
  const $content = useRef<any>(null);

  const [isOpen, setIsOpen] = useState(false);

  const setPosition = () => {
    const trigger = $trigger.current?.getBoundingClientRect();
    const content = $content.current?.getBoundingClientRect();

    const cords = getPosition(trigger, content, position, offsetY, offsetX);

    $content.current.style.top = `${cords.top + window.scrollY}px`;
    $content.current.style.left = `${cords.left + window.scrollX}px`;
  };

  const open = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      close();
    }
  }, [close]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!closeOnClickOutside) {
      return;
    }

    if (
      $trigger.current.contains(event.target) ||
      $content.current.contains(event.target)
    ) {
      return;
    }

    close();
  }, [$trigger, close, closeOnClickOutside]);

  useEffect(() => {
    if (isOpen) {
      setPosition();
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      const { left, top } = $trigger?.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
      let oldPositionTrigger = { left, top };

      interval = setInterval(() => {
        const { left, top } = $trigger?.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
        const currentPositionTrigger = { left, top };

        if (JSON.stringify(oldPositionTrigger) !== JSON.stringify(currentPositionTrigger)) {
          oldPositionTrigger = currentPositionTrigger;
          setPosition?.();
        }
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("resize", setPosition);
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("resize", setPosition);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("resize", setPosition);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const Dropdown = useCallback(({ children, style }: any) => {
    const styles = style ?? {};

    const handleClick = (event: MouseEvent) => {
      event.stopPropagation();
      children?.props?.onClick?.(event);
    };

    const content = cloneReferencedElement(children, {
      onClick: handleClick,
      ref: (element: any) => { $content.current = element; },
      style: { ...styles, position: placementStyle },
    });

    return isOpen && <Portal>{content}</Portal>;
  }, [isOpen]);

  return {
    close,
    Dropdown,
    isOpen,
    open,
  };
};

export type { PositionType };
export default useDropdown;
