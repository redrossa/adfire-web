import { fetchTransactions } from '@/app/lib/queries/transactions';
import TransactionsListScroll from '@/app/ui/transactions/list';

export default async function DashboardPage() {
  const transactions = await fetchTransactions();
  return (
    <>
      <h4 className="mb-4">Transactions</h4>
      <TransactionsListScroll transactions={transactions} />
    </>
  );
}
