import { Account } from '@/app/lib/models/accounts';

export interface Entry {
  /** Date (YYYY-MM-DD) of the entry */
  date: string;

  /** Non-negative dollar value */
  amount: number;

  /** Whether the entry credits or debits the account */
  isCredit: boolean;

  /** Account associated with this entry */
  account: Account;
}

export interface Transaction {
  /** Generic name of the transaction */
  name: string;

  /** Entries in this transaction */
  entries: Entry[];
}

export interface TransactionSummary {
  type: 'income' | 'expense' | 'transfer';
  name: string;
  date: string;
  creditAmount: number;
  debitAmount: number;
  creditAccounts: Account[];
  debitAccounts: Account[];
  merchants: Account[];
}

export interface TransactionSummaryGroup {
  date: string;
  summaries: TransactionSummary[];
}
