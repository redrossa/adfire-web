import { Create, Update } from '@/lib/models/common';

export interface Account {
  id: string;
  name: string;
  isMerchant: boolean;
  amount: number;
  holderName: string;
  mask: string;
}

export type AccountCreate = Create<Account>;

export type AccountUpdate = Update<Account>;
