const getSortDirection = (ordering: string) => (/-/.test(ordering) ? "Asc" : "Desc");
const getSortDirectionSign = (direction: ISortDirection) => (direction === "Asc" ? "-" : "");
const getSortBy = (ordering: string | null) => ordering?.replace("-", "");

export {
  getSortBy,
  getSortDirection,
  getSortDirectionSign,
};
