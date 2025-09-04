import { Account, AccountType, Entry, Id, Transaction } from '@/app/lib/sdk';

export interface MockDB {
  /** Map of account ID -> account */
  accountIdMap: Map<Id, Account>;

  /** Map of account type -> Map of account name -> account */
  accountNameTypeMap: Record<AccountType, Map<string, Account>>;

  /** Map of account ID -> array of ordered transactions */
  accountIdTransactionsMap: Map<Id, Transaction[]>;

  /** Map of transaction ID -> transaction */
  transactionIdMap: Map<Id, Transaction>;

  /** Map of transaction Id -> array of ordered entries */
  transactionIdEntriesMap: Map<Id, Entry[]>;

  /** Map of entry ID -> entry */
  entryIdMap: Map<Id, Entry>;
}
