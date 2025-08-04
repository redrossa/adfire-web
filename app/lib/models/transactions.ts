import { Account } from '@/app/lib/models/accounts';

export interface Entry {
  /** Date (YYYY-MM-DD) of the entry */
  date: string;

  /** Positive non-zero dollar value */
  amount: number;

  /** Whether the entry credits or debits the account */
  isCredit: boolean;

  /** Account associated with this entry */
  account: Account;
}

export interface Transaction {
  /** Generic name of the transaction */
  name: string;

  /** Supported types of transactions */
  type: 'income' | 'expense' | 'transfer';

  /**
   * Entries in this transaction. It cannot be an empty array,
   * must have equal total credits and total debits, and contains
   * only one credited account.
   */
  entries: Entry[];
}
