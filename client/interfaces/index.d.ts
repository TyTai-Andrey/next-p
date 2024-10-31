interface IListResult<T> {
  count: number,
  next: string | null,
  previous: string | null,
  results: T[]
}
type ITypeOrError<T> = T | { error: unknown };

type ISortDirection = "Asc" | "Desc" | null | undefined;

type ObjectType<T> = { [key: string]: T };
type DefaultItem = { id: string; name: string };

type Replace<T, K extends keyof T, TReplace> = Pick<T, Exclude<keyof T, K>> & {
  [P in K]: TReplace;
};

type PartialAll<T> = {
  [P in keyof T]?: PartialAll<T[P]>;
};
