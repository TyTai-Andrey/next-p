function IsNotErrorResponse<T>(candidate: any):
  candidate is IListResult<T> { return candidate?.error === undefined; }

function IsErrorResponse(candidate: any):
  candidate is { error: unknown; } { return candidate?.error !== undefined; }

export { IsErrorResponse, IsNotErrorResponse };
