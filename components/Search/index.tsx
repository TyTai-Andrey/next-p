// react
import {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
} from "react";

// local imports
// components
import { Clear, Container } from "@components/Search/styled";
import Dropdown from "@components/Dropdown";
import Input from "@components/Input";

// utils
import useDebounce from "@utils/useDebounce";

type SearchProps<T> = {
  debounceDelay?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  initValue?: string;
  dropdownItems?: T[];
  onSelect?: (item: { id: string }) => void;
  onClear?: () => void;
}

function Search<T extends DefaultItem>({
  debounceDelay,
  dropdownItems,
  initValue,
  onChange,
  onClear: onClearProp,
  onSelect,
}: SearchProps<T>) {
  const $event = useRef<ChangeEvent<HTMLInputElement> | null>(null);
  const [value, setValue] = useState(initValue);

  const onChangeValue = useCallback(() => {
    if (onChange && $event.current) onChange($event.current);
  }, [value]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    $event.current = e;
  };

  const onClear = useCallback(() => {
    setValue("");
    onClearProp?.();
  }, [onClearProp]);

  useDebounce(onChangeValue, debounceDelay);

  return (
    <Container>
      <Dropdown items={dropdownItems} onSelect={onSelect}>
        <Input onChange={onChangeHandler} placeholder="search" value={value} />
      </Dropdown>
      {!!value && <Clear onClick={onClear} />}
    </Container>
  );
}

export default Search;
