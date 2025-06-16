import { Create, Update } from '@/lib/models/common';

export interface AccountUser {
  id: string;
  name: string;
  mask: string;
}

export interface Account<TAccountUser = AccountUser> {
  id: string;
  name: string;
  isMerchant: boolean;
  amount: number;
  users: TAccountUser[];
}

export type AccountUserCreate = Create<AccountUser>;
export type AccountCreate = Create<Account<AccountUserCreate>>;

export type AccountUserUpdate = Update<AccountUser>;
export type AccountUpdate = Update<Account<AccountUserUpdate>>;
