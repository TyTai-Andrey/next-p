import { AxiosError } from "axios";

const isNotErrorResponse = <T>(candidate: ITypeOrError<T>):
  candidate is T => (candidate as { error: AxiosError; })?.error === undefined;

const isErrorResponse = <T>(candidate: ITypeOrError<T>):
  candidate is { error: unknown; } => (candidate as { error: AxiosError; })?.error !== undefined;

export { isErrorResponse, isNotErrorResponse };
