// react
import {
  FC,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Portal } from "react-portal";

// local imports
// components
import {
  Backdrop,
  Close,
  Container,
  Content,
} from "@modals/Modal/style";

type ExtendedModalProps = {
  className?: string;
};

export type ModalProps = {
  children?: React.ReactNode | ((data: ExtendedModalProps) => React.ReactNode);
  isOpen?: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
} & ExtendedModalProps;

const Modal: FC<ModalProps> = forwardRef(
  (
    {
      children, isOpen, onClose, style, ...props
    },
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const $content = useRef<HTMLDivElement>(null);
    const $backdrop = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(() => {
      if (onClose) onClose();
    }, [onClose]);

    const element = useMemo(() => {
      if (typeof children === "function") {
        return children({ ...props });
      }
      if (isValidElement(children)) {
        return cloneElement(children, {
          ...(children.props ?? {}),
          ...props,
        });
      }
      return children;
    }, [children, props]);

    return isOpen && (
      <Portal>
        <Container ref={ref}>
          <Backdrop ref={$backdrop} />

          <Content ref={$content} style={style}>
            <Close onClick={handleClose}>
              <i className="fa-solid fa-xmark" />
            </Close>
            {element}
          </Content>
        </Container>
      </Portal>
    );
  },
);

export default Modal;
