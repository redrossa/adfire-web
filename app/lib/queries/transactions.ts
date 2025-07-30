import { Transaction, TransactionSummary } from '@/app/lib/models/transactions';
import { transactions } from '@/app/lib/data/transactions';
import { isCredit, isDebit, isMerchant, isMine } from '@/app/lib/utils';
import uniqBy from 'lodash/uniqBy';
import sum from 'lodash/sum';
import min from 'lodash/min';

export async function fetchTransactions(): Promise<Transaction[]> {
  return transactions;
}

export async function fetchTransactionSummary(): Promise<TransactionSummary[]> {
  return transactions.map((tx) => {
    const date = min(tx.entries.map((e) => e.date))!;
    const myEntries = tx.entries.filter(isMine);
    const creditAmount = sum(myEntries.filter(isCredit).map((e) => e.amount));
    const debitAmount = sum(myEntries.filter(isDebit).map((e) => e.amount));
    const type = debitAmount > 0 && creditAmount === 0 ? 'income' : 'expense';
    const creditAccounts = uniqBy(
      myEntries.filter(isCredit).map((e) => e.account),
      'name',
    );
    const debitAccounts = uniqBy(
      myEntries.filter(isDebit).map((e) => e.account),
      'name',
    );

    const isIncome = creditAmount === 0 && debitAmount > 0;
    const merchantEntries = tx.entries.filter(isMerchant);
    const merchants = uniqBy(
      merchantEntries
        .filter(isIncome ? isCredit : isDebit)
        .map((e) => e.account),
      'name',
    );
    return {
      type,
      name: tx.name,
      date,
      creditAmount,
      debitAmount,
      creditAccounts,
      debitAccounts,
      merchants,
    };
  });
}
