import { Balance } from '@/lib/models/balance';

export interface Account {
  id?: string;
  name: string;
  isMerchant: boolean;
  users: AccountUser[];
}

export interface AccountUser {
  id?: string;
  name: string;
  mask: string;
}

export interface AccountBalance extends Account, Balance {
  users: AccountUserBalance[];
}

export interface AccountUserBalance extends AccountUser, Balance {}
