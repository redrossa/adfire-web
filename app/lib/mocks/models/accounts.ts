import { AccountType } from '@/app/lib/sdk';

export interface MockAccount {
  name: string;
  type: AccountType;
  domain?: string;
}
