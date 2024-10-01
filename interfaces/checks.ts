function IsNotErrorResponse<T>(candidate: any):
  candidate is IListResult<T> { return candidate?.error === undefined; }

export default IsNotErrorResponse;
