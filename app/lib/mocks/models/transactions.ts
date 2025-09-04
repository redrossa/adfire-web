import { TransactionType } from '@/app/lib/sdk';
import { MockEntry } from '@/app/lib/mocks/models/entries';

export interface MockTransaction {
  name: string;
  type: TransactionType;
  entries: MockEntry[];
}
