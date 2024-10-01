// react
import React, {
  FC,
  useEffect,
  useState,
} from "react";

// local imports
// utils
import hasParentElemWihtDataset from "@utils/hasParentElemWihtDataset";

// components
import { Container, DropdownList } from "./style";

type DropdownProps = {
  children: React.ReactNode;
  items: DefaultItem[];
  getIdFromItem?: (item: any) => string;
  getNameFromItem?: (item: any) => string;
  onClick?: (item: DefaultItem) => void;
};

const Dropdown: FC<DropdownProps> = ({
  children,
  getIdFromItem,
  getNameFromItem,
  items,
  onClick,
}) => {
  const [open, setOpen] = useState(false);

  const onFocusHandler = () => {
    setOpen(true);
  };

  const onClickHandler = (item: DefaultItem) => {
    onClick?.(item);
    setOpen(false);
  };

  useEffect(() => {
    const click = (e: MouseEvent) => {
      const check = hasParentElemWihtDataset(e, "idType", "select");

      if (check) {
        setOpen(false);
      }
    };

    if (open) window.addEventListener("click", click);

    return () => {
      window.removeEventListener("click", click);
    };
  }, [open]);

  return (
    <Container data-id-type="select">
      <>
        {React.isValidElement(children) ?
          React.cloneElement(children, {
            ...children.props,
            onFocus: () => {
              onFocusHandler();
              children.props?.onFocus?.();
            },
          } as any) :
          null}
      </>
      {open && !!items?.length && (
        <DropdownList>
          {items.map(item => (
            <li
              key={getIdFromItem?.(item) ?? item.id}
              onClick={() => onClickHandler(item)}
            >
              {getNameFromItem?.(item) ?? item.name}
            </li>
          ))}
        </DropdownList>
      )}
    </Container>
  );
};

export default Dropdown;
