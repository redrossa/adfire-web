import { fetchTransactionSummaryGroup } from '@/app/lib/queries/transactions';
import TransactionsList from '@/app/ui/transactions/list';

export default async function DashboardPage() {
  const transactions = await fetchTransactionSummaryGroup();
  return (
    <>
      <h4 className="mb-4">Transactions</h4>
      <TransactionsList transactions={transactions} />
    </>
  );
}
