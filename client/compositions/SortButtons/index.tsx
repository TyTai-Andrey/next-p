// next
import { useSearchParams } from "next/navigation";

// react
import {
  FC,
  useCallback,
  useMemo,
  useState,
} from "react";

// local imports
// utils
import {
  getSortBy,
  getSortDirection,
  getSortDirectionSign,
} from "@compositions/SortButtons/utils";

// hooks
import usePushRouter from "@hooks/usePushRouter";
import useQueryObserver from "@hooks/useQueryObserver";

// components
import Button from "@compositions/SortButtons/style";
import { Space } from "@components/Space";

interface SortButtonProps {
  fields: { field: string, title: string }[]
}

const SortButtons: FC<SortButtonProps> = ({ fields }) => {
  const query = useSearchParams();
  const { pushRouterQuery } = usePushRouter();

  const ordering = useMemo(() => query?.get("ordering"), [query?.get("ordering")]);

  const [sortBy, setSortBy] = useState(() => getSortBy(ordering));
  const [sortDirection, setSortDirection] = useState<ISortDirection>(
    () => (ordering ? getSortDirection(ordering) : undefined),
  );

  const changeFieldSort = useCallback(
    (name: string) => {
      let newSortDirection: ISortDirection;

      if (sortBy !== name) newSortDirection = "Asc";
      if (sortBy === name && !sortDirection) newSortDirection = "Asc";
      if (sortBy === name && sortDirection === "Asc") newSortDirection = "Desc";

      pushRouterQuery(
        "ordering",
        newSortDirection ? `${getSortDirectionSign(newSortDirection)}${name}` : undefined,
      );
    },
    [pushRouterQuery, sortBy, sortDirection],
  );

  const getArrow = useCallback(
    (field: string) => {
      if (sortBy !== field || !sortDirection) return null;
      if (sortDirection === "Asc") return "↑";
      if (sortDirection === "Desc") return "↓";
      return null;
    },
    [sortBy, sortDirection],
  );

  const onChangeQueryOrdering = useCallback((ordering: string | null) => {
    setSortDirection(ordering ? getSortDirection(ordering) : undefined);
    setSortBy(ordering ? getSortBy(ordering) : undefined);
  }, []);

  useQueryObserver(onChangeQueryOrdering, "ordering");

  return (
    <Space>
      {fields.map(({ field, title }) => (
        <Button key={field} onClick={() => changeFieldSort(field)}>
          <>
            {title} {getArrow(field)}
          </>
        </Button>
      ))}
    </Space>
  );
};

export default SortButtons;
