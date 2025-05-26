'use server';

import { Transaction } from '../models';
import { cookies } from 'next/headers';
import { handleResponse } from '@/lib/services/utils';

export async function getTransactions(
  accountId?: string,
): Promise<Transaction[]> {
  const cookieStore = await cookies();

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/transactions`);
  if (accountId) {
    url.searchParams.set('accountId', accountId.toString());
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
    },
  });

  return await handleResponse(res);
}

export async function getTransaction(id: string): Promise<Transaction> {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
    },
  );

  return await handleResponse(res);
}

export async function deleteTransaction(id: string): Promise<void> {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  return await handleResponse(res);
}

export async function createTransaction(
  transaction: Transaction,
): Promise<Transaction> {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(transaction),
  });

  return await handleResponse(res);
}

export async function updateTransaction(
  transaction: Transaction,
): Promise<Transaction> {
  const cookieStore = await cookies();

  const id = transaction.id!;
  delete transaction.id;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(transaction),
    },
  );

  return await handleResponse(res);
}
