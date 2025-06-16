'use server';

import { Account, AccountCreate, AccountUpdate, Transaction } from '../models';
import { request } from '@/lib/services/utils';
import { TimeSeriesPoint } from '@/lib/models/balance';

export async function getAccounts(
  includeMerchants: boolean = false,
): Promise<Account[]> {
  return request({
    path: `${process.env.NEXT_PUBLIC_API_URL}/accounts`,
    searchParams: {
      includeMerchants: includeMerchants.toString(),
    },
  });
}

export async function getAccount(id: string): Promise<Account> {
  return request({ path: `${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}` });
}

export async function getAccountBalance(
  id: string,
): Promise<TimeSeriesPoint[]> {
  return request({
    path: `${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}/balance`,
  });
}

export async function getAccountTransactions(
  id: string,
): Promise<Transaction[]> {
  return request({
    path: `${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}/transactions`,
  });
}

export async function deleteAccount(id: string): Promise<void> {
  return request({
    path: `${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`,
    method: 'DELETE',
  });
}

export async function createAccount(account: AccountCreate): Promise<Account> {
  return request({
    path: `${process.env.NEXT_PUBLIC_API_URL}/accounts`,
    method: 'POST',
    body: account,
  });
}

export async function updateAccount(account: AccountUpdate): Promise<Account> {
  const { id, ...payload } = account;
  return request({
    path: `${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`,
    method: 'PUT',
    body: payload,
  });
}

export async function createMerchant(name: string): Promise<Account> {
  return createAccount({
    isMerchant: true,
    name,
    amount: 0,
    users: [
      {
        name,
        mask: '🛒',
      },
    ],
  });
}
