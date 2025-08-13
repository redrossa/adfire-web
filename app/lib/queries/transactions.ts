import { Transaction } from '@/app/lib/models/transactions';

export async function fetchTransactions(): Promise<Transaction[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function fetchTransaction(id: string): Promise<Transaction> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`,
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}
