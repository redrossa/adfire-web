import { MockDB } from '@/app/lib/mocks/models/db';
import {
  Account,
  AccountType,
  Entry,
  Id,
  InternalAccountType,
  Transaction,
  TransactionSide,
  TransactionType,
} from '@/app/lib/sdk';
import accounts from './data/accounts.json';
import transactions from './data/transactions.json';
import {
  MockAccount,
  MockEntry,
  MockTransaction,
} from '@/app/lib/mocks/models';
import { compact, min, sum } from 'lodash';
import { isCredit, isDebit } from '@/app/lib/utils/entries';

const mockAccounts = accounts as MockAccount[];
const mockTransactions = transactions as MockTransaction[];

export async function setupServerHandlers() {
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.NEXT_RUNTIME === 'nodejs'
  ) {
    const { server } = await import('@/app/lib/mocks/node');
    server.listen();
  }
}

export async function setupClientHandlers() {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    const { worker } = await import('@/app/lib/mocks/browser');
    await worker.start();
  }
}

function mapMockEntries(
  mockEntries: MockEntry[],
  accountNameTypeMap: Record<AccountType, Map<string, Account>>,
): Entry[] {
  return compact(
    mockEntries.map((e) => {
      const account = accountNameTypeMap[e.account.type].get(e.account.name);
      if (!account) {
        return null;
      }
      const entry: Entry = {
        id: crypto.randomUUID(),
        date: e.date,
        amount: e.amount,
        account,
      };
      return entry;
    }),
  );
}

function earliestDate(entries: Entry[]): string | undefined {
  return min(entries.map((e) => e.date));
}

function calculateEquity(entries: Entry[]): number {
  const internalEntries = entries.filter((e) =>
    Object.values(InternalAccountType).includes(e.account.type as any),
  );
  const debits = internalEntries.filter(isDebit);
  const credits = internalEntries.filter(isCredit);
  const debitTotal = sum(debits.map((e) => Math.abs(e.amount)));
  const creditTotal = sum(credits.map((e) => Math.abs(e.amount)));
  return debitTotal - creditTotal;
}

function createFromSide(
  entries: Entry[],
  type: TransactionType,
): TransactionSide {
  let filtered: Entry[];
  switch (type) {
    case TransactionType.INCOME:
      filtered = entries.filter((e) => e.account.type === AccountType.INCOME);
      break;
    case TransactionType.TRANSFER:
      filtered = entries.filter(
        (e) =>
          Object.values(InternalAccountType).includes(e.account.type as any) &&
          isCredit(e),
      );
      break;
    case TransactionType.EXPENSE:
      filtered = entries.filter((e) => e.account.type === AccountType.EXPENSE);
      break;
  }
  const accounts = filtered.map((e) => e.account);
  const equity = calculateEquity(filtered);
  return {
    accounts,
    equity,
  };
}

function createToSide(
  entries: Entry[],
  type: TransactionType,
): TransactionSide {
  let filtered: Entry[];
  switch (type) {
    case TransactionType.INCOME:
    case TransactionType.TRANSFER:
      filtered = entries.filter(
        (e) =>
          Object.values(InternalAccountType).includes(e.account.type as any) &&
          isDebit(e),
      );
      break;
    case TransactionType.EXPENSE:
      filtered = entries.filter((e) =>
        Object.values(InternalAccountType).includes(e.account.type as any),
      );
      break;
  }
  const accounts = filtered.map((e) => e.account);
  const equity = calculateEquity(filtered);
  return {
    accounts,
    equity,
  };
}

export function createMockDB(): MockDB {
  const db: MockDB = {
    accountIdMap: new Map<Id, Account>(),
    accountNameTypeMap: {
      [AccountType.ASSET]: new Map<string, Account>(),
      [AccountType.LIABILITY]: new Map<string, Account>(),
      [AccountType.INCOME]: new Map<string, Account>(),
      [AccountType.EXPENSE]: new Map<string, Account>(),
    },
    accountIdTransactionsMap: new Map<Id, Transaction[]>(),
    transactionIdMap: new Map<Id, Transaction>(),
    transactionIdEntriesMap: new Map<Id, Entry[]>(),
    entryIdMap: new Map<Id, Entry>(),
  };

  if (process.env.NODE_ENV === 'development') {
    for (const mockAccount of mockAccounts) {
      const account: Account = { ...mockAccount, id: crypto.randomUUID() };
      db.accountIdMap.set(account.id, account);
      db.accountNameTypeMap[account.type].set(account.name, account);
      db.accountIdTransactionsMap.set(account.id, []);
    }

    for (const mockTransaction of mockTransactions) {
      const entries = mapMockEntries(
        mockTransaction.entries,
        db.accountNameTypeMap,
      );

      const transaction: Transaction = {
        id: crypto.randomUUID(),
        name: mockTransaction.name,
        type: mockTransaction.type,
        date: earliestDate(entries)!,
        equity: calculateEquity(entries),
        value: sum(entries.filter(isDebit).map((e) => Math.abs(e.amount))),
        from: createFromSide(entries, mockTransaction.type),
        to: createToSide(entries, mockTransaction.type),
      };

      db.transactionIdMap.set(transaction.id, transaction);
      db.transactionIdEntriesMap.set(transaction.id, entries);
      for (const e of entries) {
        db.entryIdMap.set(e.id, e);
        db.accountIdTransactionsMap.get(e.account.id)!.push(transaction);
      }
    }
  }

  return db;
}
