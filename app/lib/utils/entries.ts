import {
  CreditAccountType,
  DebitAccountType,
  Entry,
  ExternalAccountType,
  InternalAccountType,
} from '@/app/lib/sdk';

export function isDebit(entry: Entry): boolean {
  return (
    (Object.values(DebitAccountType).includes(entry.account.type as any) &&
      entry.amount > 0) ||
    (Object.values(CreditAccountType).includes(entry.account.type as any) &&
      entry.amount < 0)
  );
}

export function isCredit(entry: Entry): boolean {
  return (
    (Object.values(DebitAccountType).includes(entry.account.type as any) &&
      entry.amount < 0) ||
    (Object.values(CreditAccountType).includes(entry.account.type as any) &&
      entry.amount > 0)
  );
}

export function isInternal(entry: Entry): boolean {
  return Object.values(InternalAccountType).includes(entry.account.type as any);
}

export function isExternal(entry: Entry): boolean {
  return Object.values(ExternalAccountType).includes(entry.account.type as any);
}
