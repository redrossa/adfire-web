import { Create, Update } from '@/lib/models/common';

export interface TransactionEntry {
  id: string;
  accountId: string | null;
  date: string;
  amount: number;
}

export interface Transaction<TEntry = TransactionEntry> {
  id: string;
  name: string;
  date: string;
  amount: number;
  entries: TEntry[];
}

export type TransactionEntryCreate = Create<TransactionEntry>;
export type TransactionCreate = Create<Transaction<TransactionEntryCreate>>;

export type TransactionEntryUpdate = Update<TransactionEntry>;
export type TransactionUpdate = Update<Transaction<TransactionEntryUpdate>>;
