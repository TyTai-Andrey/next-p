// react
import {
  ChangeEvent,
  FC,
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

type SearchProps = {
  debounceDelay?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  initValue?: string;
  dropdownItems?: DefaultItem[];
  onSelect?: (item: { id: string }) => void;
  onClear?: () => void;
}

const Search: FC<SearchProps> = ({
  debounceDelay,
  dropdownItems,
  initValue,
  onChange,
  onClear: onClearProp,
  onSelect,
}) => {
  const $event = useRef<ChangeEvent<HTMLInputElement> | null>(null);
  const [value, setValue] = useState(initValue);

  const onChangeValue = useCallback(() => {
    if (onChange && $event.current) onChange($event.current);
  }, [value]);

  useDebounce(onChangeValue, debounceDelay);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    $event.current = e;
  };

  const onClear = () => {
    setValue("");
    onClearProp?.();
  };

  return (
    <Container>
      <Dropdown items={dropdownItems ?? []} onClick={onSelect}>
        <Input onChange={onChangeHandler} placeholder="search" value={value} />
      </Dropdown>
      {!!value && <Clear onClick={onClear} />}
    </Container>
  );
};

export default Search;
