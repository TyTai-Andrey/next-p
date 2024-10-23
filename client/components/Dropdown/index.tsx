// react
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

// local imports
// utils
import searchParentElemWithDataset from "@utils/hasParentElemWithDataset";

// components
import { Container, DropdownList } from "@components/Dropdown/style";
import DropdownItem from "@components/Dropdown/DropdownItem";

type DropdownProps<T> = {
  children: React.ReactNode;
  items?: T[];
  getIdFromItem?: (item: T) => string;
  getNameFromItem?: (item: T) => string;
  onSelect?: (item: T) => void;
  onBlur?: () => void
  id?: string
};

function Dropdown<T extends DefaultItem>({
  children,
  getIdFromItem,
  getNameFromItem,
  id = "dropdown",
  items = [],
  onBlur,
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
      searchParentElemWithDataset({
        datasetName: "idType",
        datasetValue: id,
        event: e,
        failCallback: () => {
          (children as ObjectType<any>)?.props?.onBlur?.();
          onBlur?.();
          setOpen(false);
        },
      });
    };

    if (open) window.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, [open, id]);

  return (
    <Container data-id-type={id}>
      <>
        {React.isValidElement(children) ?
          React.cloneElement(children, {
            ...children.props,
            onBlur: undefined,
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
            <DropdownItem
              key={getIdFromItem?.(item) ?? item.id}
              name={getNameFromItem?.(item) ?? item.name}
              onSelectHandler={() => onSelectHandler(item)}
            />
          ))}
        </DropdownList>
      )}
    </Container>
  );
}

export default Dropdown;
