import { auth } from '@clerk/nextjs/server';
import { fetcher } from './fetcher';

type ApiOptions = Omit<RequestInit, 'headers' | 'body'> & {
  headers?: Record<string, string>;
  body?: unknown;
};

function buildJsonBody(body: unknown) {
  if (body === undefined) return undefined;
  return typeof body === 'string' ? body : JSON.stringify(body);
}

export async function apiServer<TResponse = unknown>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<TResponse> {
  const { getToken } = await auth();
  const token = await getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  };

  return fetcher<TResponse>(endpoint, {
    ...options,
    headers,
    body: buildJsonBody(options.body),
  });
}
