// react
import { useEffect } from "react";

const _debounceDelay = 550;

type UseDebounce = (func: () => void, debounceDelay?: number) => void;

const useDebounce: UseDebounce = (func, debounceDelay = _debounceDelay) => {
  useEffect(() => {
    const timer = setTimeout(func, debounceDelay ?? _debounceDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [debounceDelay, func]);
};

export default useDebounce;
