export async function handleResponse<T>(res: Response): Promise<T> {
  const body = await res.json();
  if (!res.ok) {
    console.error(JSON.stringify(body, null, 2));
    throw Error(res.status < 500 ? 'Something went wrong' : 'Server error');
  }
  return body;
}
