type InitState = {
  data?: {
    count: number;
    next: string | null;
    previous: string | null;
    results: null | Game[];
  };
  loading: boolean;
  error: boolean;
}

export default InitState;
