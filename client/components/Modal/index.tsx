// react
import {
  FC,
  cloneElement,
  forwardRef,
  isValidElement,
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
} from "@components/Modal/style";

export interface ModalProps {
  children?: React.ReactNode | ((data: any) => React.ReactNode);
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
}

const Modal: FC<ModalProps> = forwardRef(
  (
    {
      children, isOpen, onClose, style, ...props
    },
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const $content = useRef<HTMLDivElement>(null);
    const $backdrop = useRef<HTMLDivElement>(null);

    const handleClose = () => {
      onClose?.();
    };

    return isOpen && (
      <Portal>
        <Container ref={ref}>
          <Backdrop ref={$backdrop} />

          <Content ref={$content} style={style}>
            <Close onClick={handleClose} />

            {typeof children === "function" ?
              (children as any)({ ...props }) :
              // eslint-disable-next-line @getify/proper-ternary/nested
              isValidElement(children) ?
                cloneElement(children, {
                  ...(children.props ?? {}),
                  ...props,
                }) :
                children}
          </Content>
        </Container>
      </Portal>
    );
  },
);

// Exports
export default Modal;
