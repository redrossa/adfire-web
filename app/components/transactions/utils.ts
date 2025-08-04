import { TransactionListItem } from '@/app/components/transactions/models';
import { Transaction } from '@/app/lib/models/transactions';
import min from 'lodash/min';
import {
  isCredit,
  isDebit,
  isMerchant,
  isMine,
  toAccount,
  toAmount,
} from '@/app/lib/utils';
import sum from 'lodash/sum';
import { Account } from '@/app/lib/models/accounts';

export function identifyDate(tx: Transaction): string {
  return min(tx.entries.map((e) => e.date))!;
}

export function identifyCredit(tx: Transaction): number {
  return sum(tx.entries.filter(isMine).filter(isCredit).map(toAmount));
}

export function identifyDebit(tx: Transaction): number {
  return sum(tx.entries.filter(isMine).filter(isDebit).map(toAmount));
}

export function identifyCounterparties(tx: Transaction): Account[] {
  const isNetCredit = identifyIsNetCredit(tx);
  switch (tx.type) {
    case 'income':
      return tx.entries.filter(isCredit).filter(isMerchant).map(toAccount);
    case 'transfer':
      return tx.entries.filter(isCredit).filter(isMine).map(toAccount);
    case 'expense':
      return tx.entries
        .filter(isNetCredit ? isDebit : isCredit)
        .filter(isMerchant)
        .map(toAccount);
  }
}

export function identifyAccounts(tx: Transaction): Account[] {
  const isNetCredit = identifyIsNetCredit(tx);
  switch (tx.type) {
    case 'income':
    case 'transfer':
      return tx.entries.filter(isDebit).filter(isMine).map(toAccount);
    case 'expense':
      return tx.entries
        .filter(isNetCredit ? isCredit : isDebit)
        .filter(isMine)
        .map(toAccount);
  }
}

export function identifyIsNetCredit(tx: Transaction): boolean {
  const credit = identifyCredit(tx);
  const debit = identifyDebit(tx);
  return credit > debit;
}

export function toListItem(tx: Transaction): TransactionListItem {
  return {
    ...tx,
    date: identifyDate(tx),
    counterparties: identifyCounterparties(tx),
    accounts: identifyAccounts(tx),
    credit: identifyCredit(tx),
    debit: identifyDebit(tx),
  };
}

export function groupListItems(
  items: TransactionListItem[],
): Partial<Record<string, TransactionListItem[]>> {
  return Object.groupBy(items, (it) => it.date);
}
