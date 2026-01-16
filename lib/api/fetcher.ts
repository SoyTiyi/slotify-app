import { API_URL } from './config';
import { ApiError } from './errors';

type Json = Record<string, any>;

function isJsonResponse(contentType: string | null) {
  return contentType?.includes('application/json');
}

export async function fetcher<TResponse = unknown>(
  endpoint: string,
  options: RequestInit & { headers?: Record<string, string> } = {},
): Promise<TResponse> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
    },
  });

  if (res.status === 204) {
    return null as TResponse;
  }

  const contentType = res.headers.get('content-type');

  if (!res.ok) {
    let payload: unknown = undefined;

    try {
      if (isJsonResponse(contentType)) {
        payload = (await res.json()) as Json;
      } else {
        payload = await res.text();
      }
    } catch {
      // ignorar
    }

    const message =
      (typeof payload === 'object' && payload && 'message' in payload
        ? String((payload as any).message)
        : undefined) ||
      (typeof payload === 'string' && payload.trim() ? payload : undefined) ||
      res.statusText ||
      'Request failed';

    throw new ApiError(message, res.status, payload);
  }

  if (isJsonResponse(contentType)) {
    return (await res.json()) as TResponse;
  }

  return (await res.text()) as unknown as TResponse;
}
