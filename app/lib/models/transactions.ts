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

export const transactionTypes = ['income', 'expense', 'transfer'] as const;

export type TransactionType = (typeof transactionTypes)[number];

/**
 * Normalized model of a transaction
 */
export interface Transaction {
  id: string;

  /** Generic name of the transaction */
  name: string;

  /** Type of this transaction  */
  type: TransactionType;

  /**
   * Entries in this transaction. It cannot be an empty array,
   * must have equal total credits and total debits, and contains
   * only one credited account.
   */
  entries: Entry[];
}

/**
 * A transaction can be highlighted (or summarized) from different perspectives,
 * e.g. that of the whole user's portfolio, specific merchant account, or just
 * one of the user's account. This account (or absence of, in the case of whole
 * user's portfolio) is called the reference account. Depending on the reference
 * account, the transaction might have different dates, credits, debit, and
 * other denormalized rendering properties.
 */
export interface TransactionContext {
  /** Underlying transaction of this context */
  transaction: Transaction;

  /** The reference account or whole user's portfolio if undefined */
  reference?: Account;

  /** Date of the earliest entry for referenced account, if any, else earliest entry's date */
  date: string;

  /** Total amount transacted */
  value: number;

  /** Total debit minus total credit for owned accounts */
  portfolioBalance: number;

  /** Total debit minus total credit for counterparties */
  counterpartyBalance: number;

  /** Total debit minus total credit for accounts */
  accountBalance: number;

  /** Total debit minus total credit for reference account, if any, else equals portfolioBalance */
  referenceBalance: number;

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
}
