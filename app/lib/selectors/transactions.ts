import {
  Entry,
  Transaction,
  TransactionContext,
  TransactionType,
} from '@/app/lib/models/transactions';
import { Account } from '@/app/lib/models/accounts';
import { getBalance, getEquity } from '@/app/lib/selectors/accounts';
import { min, sum } from 'lodash';

export const isCredit = (e: Entry) => e.isCredit;
export const isDebit = (e: Entry) => !e.isCredit;
export const isMine = (e: Entry) =>
  ['asset', 'liability'].includes(e.account.type);
export const isMerchant = (e: Entry) => !isMine(e);
export const isAnyAccount = (a?: Account | Account[]) => (e: Entry) => {
  if (!a) {
    return isMine(e);
  } else if (Array.isArray(a)) {
    return a.map((x) => x.id).includes(e.account.id);
  } else {
    return a.id === e.account.id;
  }
};
export const toDate = (e: Entry) => e.date;
export const toAccount = (e: Entry) => e.account;
export const toAmount = (e: Entry) => e.amount;
export const withReference =
  (fn: (e: Entry) => boolean, reference?: Account) => (e: Entry) =>
    reference?.id ? reference.id === e.account.id : fn(e);

// CONTEXTS

export function identifyDate(tx: Transaction, reference?: Account): string {
  return min(tx.entries.filter(withReference(isMine, reference)).map(toDate))!;
}

export function identifyCredit(tx: Transaction): number {
  return sum(tx.entries.filter(isMine).filter(isCredit).map(toAmount));
}

export function identifyDebit(tx: Transaction): number {
  return sum(tx.entries.filter(isMine).filter(isDebit).map(toAmount));
}

export function identifyValue(tx: Transaction): number {
  return sum(tx.entries.filter(isCredit).map(toAmount));
}

export function identifyIsNetCredit(tx: Transaction): boolean {
  const credit = identifyCredit(tx);
  const debit = identifyDebit(tx);
  return credit > debit;
}

export const counterpartyIdentifiers: {
  [type in TransactionType]: (tx: Transaction) => Account[];
} = {
  income: (tx) => {
    return tx.entries
      .filter(isCredit)
      .filter((t) => t.account.type === 'income')
      .map(toAccount);
  },
  transfer: (tx) => {
    return tx.entries.filter(isCredit).filter(isMine).map(toAccount);
  },
  expense: (tx) => {
    const isNetCredit = identifyIsNetCredit(tx);
    return tx.entries
      .filter(!isNetCredit ? isCredit : isDebit)
      .filter((t) => t.account.type === 'expense')
      .map(toAccount);
  },
};

export const accountIdentifiers: {
  [type in TransactionType]: (tx: Transaction) => Account[];
} = {
  income: (tx) => {
    return tx.entries.filter(isDebit).filter(isMine).map(toAccount);
  },
  transfer: (tx) => {
    return tx.entries.filter(isDebit).filter(isMine).map(toAccount);
  },
  expense: (tx) => {
    const isNetCredit = identifyIsNetCredit(tx);
    return tx.entries
      .filter(isNetCredit ? isCredit : isDebit)
      .filter(isMine)
      .map(toAccount);
  },
};

export function identifyBalance(
  tx: Transaction,
  accounts?: Account | Account[],
) {
  return sum(
    tx.entries
      .filter(isAnyAccount(accounts))
      .map((e) => getBalance(e.amount, e.isCredit, e.account.type)),
  );
}

export function identifyEquity(
  tx: Transaction,
  accounts?: Account | Account[],
) {
  return sum(
    tx.entries
      .filter(isAnyAccount(accounts))
      .map((e) => getEquity(e.amount, e.isCredit, e.account.type)),
  );
}

export function contextualize(
  transaction: Transaction,
  reference?: Account,
): TransactionContext {
  const counterparties = counterpartyIdentifiers[transaction.type](transaction);
  const accounts = accountIdentifiers[transaction.type](transaction);
  return {
    transaction,
    reference,
    date: identifyDate(transaction, reference),
    portfolioBalance: identifyEquity(transaction),
    counterpartyBalance: identifyBalance(transaction, counterparties),
    accountBalance: identifyBalance(transaction, accounts),
    referenceBalance: identifyBalance(transaction, reference),
    value: identifyValue(transaction),
    counterparties,
    accounts,
  };
}
