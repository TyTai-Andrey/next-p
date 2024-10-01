interface IListResult<T> {
  count: number,
  next: string,
  previous: string,
  results: T[]
}

type ObjectType<T> = { [key: string]: T };
type DefaultItem = { id: string; name: string };
