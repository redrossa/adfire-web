export interface Transaction {
  id?: string;
  name: string;
  date?: string;
  amount?: number;
  debits: TransactionEntry[];
  credits: TransactionEntry[];
}

export interface TransactionEntry {
  id?: string;
  accountUserId: string | null;
  date: string;
  amount: number;
}
