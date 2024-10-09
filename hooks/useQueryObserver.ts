// react
import { useEffect } from "react";

// next
import { useSearchParams } from "next/navigation";

const useQueryObserver = (handler: (fieldValue: string | null) => void, field: string) => {
  const query = useSearchParams();

  useEffect(() => {
    const fieldValue = query?.get(field);
    handler(fieldValue);
  }, [query?.get(field), handler]);
};

export default useQueryObserver;
