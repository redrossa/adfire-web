import { MockAccount } from '@/app/lib/mocks/models/accounts';

export interface MockEntry {
  date: string;
  amount: number;
  account: Pick<MockAccount, 'name' | 'type'>;
}
