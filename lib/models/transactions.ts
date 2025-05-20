export interface Transaction {
  id?: string;
  name: string;
  date: string;
  amount: number;
  debits: TransactionEntry[];
  credits: TransactionEntry[];
}

export interface TransactionEntry {
  accountUserId: string;
  date: string;
  amount: number;
}
