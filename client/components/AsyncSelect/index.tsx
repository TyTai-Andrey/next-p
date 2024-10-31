// react
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
} from "react";

// local imports
// types
import { isNotErrorResponse } from "@interfaces/checks";

// components
import Select, { SelectProps } from "@components/Select";
import { StyledSelect, Wrapper } from "@components/AsyncSelect/style";
import Loader from "@components/Loader";

// api
import { getClientAxios } from "@api/BaseApi";

type TValue = string | number;

export interface AsyncSelectProps<TData = any>
  extends Omit<SelectProps, "value" | "onChange" | "children"> {
  value?: TValue | null;
  onChange?: (val: TValue) => void;
  fetch: (query: string) => Promise<ITypeOrError<IListResult<TData>>>;
  fetchOne?: (value: TValue) => Promise<TData>;
  dataToValue: (data: TData) => TValue;
  dataToRender?: (data: TData) => string;
  NotFound?: React.ReactNode;
  defaultDisplayValue?: string | number | null;
}

const debounceDelay = 300;

type AsyncSelectInterface = <TData extends object>(
  props: PropsWithChildren<AsyncSelectProps<TData>>,
) => React.ReactElement | null;

const AsyncSelect: AsyncSelectInterface = <TData extends object>({
  dataToRender,
  dataToValue,
  defaultDisplayValue,
  fetch,
  fetchOne: fetchOneProp,
  value,
  ...props
}: PropsWithChildren<AsyncSelectProps<TData>>) => {
  const $timer = React.useRef<number | null>(null);
  const $inited = React.useRef<boolean>(false);
  const $open = React.useRef<boolean>(false);

  const [loading, setLoading] = React.useState(false);
  const [initialLoading, setInitialLoading] = React.useState(false);
  const [items, setItems] = React.useState<TData[]>([]);
  const [search, setSearch] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [next, setNext] = React.useState<string | null>(null);

  const fetchNextPage = useCallback(
    async (next: string) => getClientAxios.get<ITypeOrError<IListResult<TData>>>(next)
      .then(res => res.data)
      .catch((error: unknown) => ({ error } as ITypeOrError<IListResult<TData>>)),
    []);

  const loadData = useCallback(async () => {
    setLoading(true);

    const response = (page > 1) && next ? await fetchNextPage(next) : await fetch(search);

    setLoading(false);
    if ($open.current) {
      if (isNotErrorResponse(response)) {
        setItems(
          (page > 1) ? [...items, ...response.results] : response.results,
        );
        setTotal(response.count);
        setNext(response.next);
      }
    } else {
      setNext(null);
      setPage(1);
    }
  }, [fetch, items, page, search]);

  const fetchOne = React.useCallback(async () => {
    setLoading(true);
    setInitialLoading(true);

    if (fetchOneProp) {
      const item = await fetchOneProp(value!);
      setItems([item]);
    }
    setInitialLoading(false);
    setLoading(false);
  }, [fetchOneProp, value]);

  const scheduleFetch = useCallback(() => {
    if ($timer.current !== null) {
      clearTimeout($timer.current);
    }

    $timer.current = setTimeout(loadData, debounceDelay) as any;
  }, [loadData]);

  const handleScroll = (event: React.UIEvent) => {
    if (loading || (items.length >= total)) {
      return;
    }

    const {
      offsetHeight, scrollHeight, scrollTop,
    } = event.target as any;

    if (
      Math.floor(scrollHeight - offsetHeight) <=
      Math.floor(scrollTop + 10)
    ) {
      setLoading(true);
      setPage(prev => prev + 1);
    }
  };
  useEffect(() => {
    if ($inited.current) {
      scheduleFetch();
    } else {
      $inited.current = true;
    }
  }, [search, page]);

  useEffect(() => {
    if (value && fetchOneProp) {
      fetchOne();
    }
  }, [fetchOne, value]);

  useEffect(() => {
    setItems([]);
  }, [value]);

  const uninitialized = initialLoading && value;

  return (
    <Wrapper>
      {uninitialized && <Loader />}
      <StyledSelect
        $uninitialized={!!uninitialized}
        defaultDisplayValue={defaultDisplayValue}
        disabled={!!uninitialized}
        onClose={() => {
          $open.current = false;
          setPage(1);
        }}
        onInput={value => setSearch(value)}
        onOpen={() => {
          $open.current = true;
          loadData();
        }}
        onScroll={handleScroll}
        value={value}
        {...props}
      >
        {items.map((item, index) => (
          <Select.Option
            key={(item as any)?.id ?? (dataToValue(item) || index)}
            label={
              (dataToRender?.(item) ??
                dataToValue(item)) as string
            }
            value={dataToValue(item)}
          />
        ))}
      </StyledSelect>
    </Wrapper>
  );
};

export default AsyncSelect;
