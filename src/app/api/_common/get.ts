import { FetchFn } from '@/_models/fetchFn';

export function generateGet<T>(fetchFn: FetchFn<T>) {
  return async () => {
    const result = await fetchFn();
    return Response.json(result, { status: 200 });
  };
}
