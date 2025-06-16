import { cookies } from 'next/headers';
import { Resource } from '@/lib/models/resource';

export async function handleResponse<T>(res: Response): Promise<T> {
  const body = await res.json();
  if (!res.ok) {
    console.error(JSON.stringify(body, null, 2));
    throw Error(res.status < 500 ? 'Something went wrong' : 'Server error');
  }
  return body;
}

export async function request<TResponse>(
  resource: Resource,
): Promise<TResponse> {
  const cookieStore = await cookies();

  const url = new URL(resource.path, process.env.NEXT_PUBLIC_API_URL);

  for (const key in resource.searchParams) {
    url.searchParams.set(key, resource.searchParams[key]);
  }

  const res = await fetch(url.toString(), {
    method: resource.method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
    },
    body: resource.payload ? JSON.stringify(resource.payload) : undefined,
  });

  return await res.json();
}
