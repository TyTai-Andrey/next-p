interface IListResult<T> {
  count: number,
  next: string,
  previous: string,
  results: T[]
}
type ITypeOrError<T> = T | { error: unknown };

type ISortDirection = "Asc" | "Desc" | null | undefined;

type ObjectType<T> = { [key: string]: T };
type DefaultItem = { id: string; name: string };
