import { useEffect, useState } from "react";

const _debounceDelay = 500;

type UseDebounce = (func: () => void, debounceDelay?: number) => void;

const useDebounce: UseDebounce = (func, debounceDelay = _debounceDelay) => {
  const [isFirst, setIsFirst] = useState(true);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFirst) {
      setIsFirst(false);
    } else {
      timer = setTimeout(func, debounceDelay ?? _debounceDelay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [debounceDelay, func]);
};

export default useDebounce;
