import { Transaction } from '@/app/lib/models/transactions';
import { Account } from '@/app/lib/models/accounts';

export interface TransactionListItem extends Transaction {
  /** Date of the earliest entry in the transaction. */
  date: string;

  /**
   * For income, this is the merchants being credited. For transfers, this
   * is the user's accounts being credited. For expenses, this is all credited
   * accounts.
   */
  counterparties: Account[];

  /**
   * For income, this is the user's accounts being debited. For transfers, this
   * is the user's accounts being debited. For expenses, this is all debited
   * accounts.
   */
  accounts: Account[];

  /** Total amount credited to all user's accounts */
  credit: number;

  /** Total amount debited to all user's accounts */
  debit: number;
}
