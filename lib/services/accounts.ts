'use server';

import { Account, AccountBalance } from '../models';
import { cookies } from 'next/headers';
import { handleResponse } from '@/lib/services/utils';

export async function getAccounts(
  includeMerchants: boolean = false,
): Promise<Account[]> {
  const cookieStore = await cookies();

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/accounts`);
  url.searchParams.set('include_merchants', includeMerchants.toString());
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

export async function getAccount(id: string): Promise<Account> {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
    },
  });

  return await handleResponse(res);
}

export async function deleteAccount(id: string): Promise<void> {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return await handleResponse(res);
}

export async function createAccount(account: Account): Promise<Account> {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(account),
  });

  return await handleResponse(res);
}

export async function updateAccount(account: Account): Promise<Account> {
  const cookieStore = await cookies();

  const id = account.id!;
  delete account.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(account),
  });

  return await handleResponse(res);
}

export async function createMerchant(name: string): Promise<Account> {
  return createAccount({
    isMerchant: true,
    name,
    users: [
      {
        name,
        mask: '🛒',
      },
    ],
  });
}

export async function getAccountBalance(id: string): Promise<AccountBalance> {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}/balance`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
    },
  );

  if (!res.ok) {
    console.error(res);
    throw new Error();
  }

  return res.json();
}
