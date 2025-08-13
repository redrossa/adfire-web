import { Account } from '@/app/lib/models/accounts';
import { Transaction } from '@/app/lib/models/transactions';
import { Balance } from '@/app/lib/models/balances';

export async function fetchAccount(id: string): Promise<Account> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function fetchAccountTransactions(
  id: string,
): Promise<Transaction[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}/transactions`,
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function fetchAccountBalances(id: string): Promise<Balance[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}/balances`,
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}
