// react
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

// local imports
// utils
import hasParentElemWithDataset from "@utils/hasParentElemWithDataset";

// components
import { Container, DropdownList } from "@components/Dropdown/style";

type DropdownProps<T> = {
  children: React.ReactNode;
  items?: T[];
  getIdFromItem?: (item: T) => string;
  getNameFromItem?: (item: T) => string;
  onSelect?: (item: T) => void;
};

function Dropdown<T extends DefaultItem>({
  children,
  getIdFromItem,
  getNameFromItem,
  items = [],
  onSelect,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const onFocusHandler = useCallback(() => setOpen(true), []);

  const onSelectHandler = useCallback((item: T) => {
    onSelect?.(item);
    setOpen(false);
  }, [onSelect]);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const check = hasParentElemWithDataset(e, "idType", "select");

      if (check) {
        setOpen(false);
      }
    };

    if (open) window.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("click", clickHandler);
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
          }) :
          null}
      </>
      {open && !!items?.length && (
        <DropdownList>
          {items.map(item => (
            <li
              key={getIdFromItem?.(item) ?? item.id}
              onClick={() => onSelectHandler(item)}
            >
              {getNameFromItem?.(item) ?? item.name}
            </li>
          ))}
        </DropdownList>
      )}
    </Container>
  );
}

export default Dropdown;
