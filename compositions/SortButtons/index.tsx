// next
import { useSearchParams } from "next/navigation";

// react
import {
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";

// local imports
// utils
import usePushRouter from "@utils/usePushRouter";

// components
import Button from "@compositions/SortButtons/style";
import { Space } from "@components/Space";

interface SortButtonProps {
  fields: { field: string, title: string }[]
}

const SortButtons: FC<SortButtonProps> = ({ fields }) => {
  const query = useSearchParams();
  const { pushRouterQuery } = usePushRouter();

  const [sortBy, setSortBy] = useState(() => query?.get("ordering")?.replace("-", ""));

  const [sortDirection, setSortDirection] = useState(() => {
    const ordering = query?.get("ordering");
    if (ordering) {
      return /-/.test(ordering) ? "Asc" : "Desc";
    }
    return undefined;
  });

  const changeFieldSort = useCallback(
    (name: string) => {
      let newSortDirection: "Asc" | "Desc" | null = null;
      const sortBy = query?.get("ordering")?.replace("-", "");
      if (sortBy === name) {
        if (!sortDirection) newSortDirection = "Asc";
        if (sortDirection === "Asc") newSortDirection = "Desc";
      } else {
        newSortDirection = "Asc";
      }

      pushRouterQuery(
        "ordering",
        newSortDirection && `${newSortDirection === "Asc" ? "-" : ""}${name}`,
      );
    },
    [query, sortDirection],
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

  useEffect(() => {
    const ordering = query?.get("ordering");
    if (ordering) {
      setSortDirection(/-/.test(ordering) ? "Asc" : "Desc");
      setSortBy(ordering?.replace("-", ""));
    } else {
      setSortDirection(undefined);
      setSortBy(undefined);
    }
  }, [query?.get("ordering")]);

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
