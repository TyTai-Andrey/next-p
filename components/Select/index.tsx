// react
import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useEffect,
  useReducer,
  useState,
} from "react";

// local imports
// components
import { Clear, Container } from "@components/Select/styled";
import Dropdown from "@components/Dropdown";
import Input from "@components/Input";

type SelectProps = {
  getIdFromItem?: (item: any) => string;
  getNameFromItem?: (item: any) => string;
  items: DefaultItem[];
  onChange?: (item?: DefaultItem, id?: string) => void;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

const Select: FC<SelectProps> = ({
  getIdFromItem,
  getNameFromItem,
  items: _items,
  onChange,
  onChangeInput,
  value: _value,
  ...props
}) => {
  const [value, setValue] = useState(_value);
  const [items, setItems] = useState(_items);
  const [_update, update] = useReducer((c: number) => c + 1, 0);

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

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChangeInput?.(e);
    setValue(value);
    setItems(
      _items?.filter(i => (getNameFromItem?.(i) ?? i.name)
        ?.toLocaleLowerCase()
        ?.includes(value?.toLocaleLowerCase() ?? ""),
      ),
    );
  };

  const onClickHandler = (item: DefaultItem) => {
    setValue(getNameFromItem?.(item) ?? item.name);
    onChange?.(item, getIdFromItem?.(item) ?? item?.id);
  };

  const onFocus = () => {
    setValue("");
    setItems(_items);
  };

  const onBlur = () => {
    setTimeout(() => {
      update();
    }, 100);
  };

  const onClear = () => {
    setValue("");
    onChange?.(undefined, undefined);
  };

  return (
    <Container>
      <Dropdown items={items} onClick={onClickHandler}>
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
};

export default Select;
