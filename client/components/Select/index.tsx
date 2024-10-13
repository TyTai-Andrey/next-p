// vendor imports
import { v4 as uuid } from "uuid";

// react
import {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

// local imports
// components
import { Clear, Container } from "@components/Select/style";
import Dropdown from "@components/Dropdown";
import Input from "@components/Input";

type SelectProps<T> = {
  getIdFromItem?: (item: T) => string;
  getNameFromItem?: (item: T) => string;
  items: T[];
  onChange?: (item?: T, id?: string) => void;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

function Select<T extends DefaultItem>({
  getIdFromItem,
  getNameFromItem,
  items: _items,
  onChange,
  onChangeInput,
  value: _value = "",
  ...props
}: SelectProps<T>) {
  const [value, setValue] = useState<string>(_value);
  const [items, setItems] = useState(_items);
  const [_update, update] = useReducer((c: number) => c + 1, 0);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChangeInput?.(e);
    setValue(value);
    setItems(
      _items?.filter(i => (getNameFromItem?.(i) ?? i.name)
        ?.toLocaleLowerCase()
        ?.includes(value.trim().toLocaleLowerCase() ?? ""),
      ),
    );
  }, [_items, getNameFromItem, onChangeInput]);

  const onSelectHandler = useCallback((item: T) => {
    setValue(getNameFromItem?.(item) ?? item.name);
    onChange?.(item, getIdFromItem?.(item) ?? item?.id);
  }, [getIdFromItem, getNameFromItem, onChange]);

  const onFocus = useCallback(() => {
    setValue("");
    setItems(_items);
  }, [_items]);

  const onBlur = useCallback(() => {
    update();
  }, [update]);

  const onClear = useCallback(() => {
    setValue("");
    onChange?.(undefined, undefined);
  }, [onChange]);

  useEffect(() => {
    setValue(_value);
  }, [_value, _update]);

  useEffect(() => {
    setItems(
      _items?.filter(i => (getNameFromItem?.(i) ?? i.name)
        ?.toLocaleLowerCase()
        ?.includes(value?.toLocaleLowerCase() ?? ""),
      ),
    );
  }, [_items, getNameFromItem, value]);

  return (
    <Container>
      <Dropdown
        id={`select${uuid()}`}
        items={items}
        onSelect={onSelectHandler}
      >
        <Input
          onBlur={onBlur}
          onChange={onChangeHandler}
          onFocus={onFocus}
          value={value}
          {...props}
        />
      </Dropdown>
      {value && <Clear onClick={onClear} />}
    </Container>
  );
}

export default Select;
