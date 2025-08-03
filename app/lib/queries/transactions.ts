import { Transaction } from '@/app/lib/models/transactions';
import { transactions } from '@/app/lib/data/transactions';

export async function fetchTransactions(): Promise<Transaction[]> {
  return transactions;
}
