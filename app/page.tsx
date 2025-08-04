import { fetchTransactions } from '@/app/lib/queries/transactions';
import TransactionsListScroll from '@/app/components/transactions/list';

export default async function DashboardPage() {
  const transactions = await fetchTransactions();
  return (
    <>
      <h1 className="mb-4 text-lg font-bold">Transactions</h1>
      <TransactionsListScroll transactions={transactions} />
    </>
  );
}
