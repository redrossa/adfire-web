export async function handleResponse<T>(res: Response): Promise<T> {
  const body = await res.json();
  if (!res.ok) {
    console.error(body);
    throw Error(res.status < 500 ? 'Something went wrong' : 'Server error');
  }
  return body;
}