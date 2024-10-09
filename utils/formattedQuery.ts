const formattedQuery = (query: URLSearchParams, defaultValue: string = "") => (
  query.toString()?.length ? `?${query.toString()}` : defaultValue
);

export default formattedQuery;
