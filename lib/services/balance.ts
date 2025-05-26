import { cookies } from 'next/headers';
import { handleResponse } from '@/lib/services/utils';
import { Balance } from '@/lib/models/balance';

export async function getBalance(): Promise<Balance> {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/balance`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
    },
  });

  return await handleResponse(res);
}
