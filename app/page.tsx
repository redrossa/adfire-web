import { fetchTransactionSummaryGroup } from '@/app/lib/queries/transactions';
import TransactionsList from '@/app/ui/transactions/list';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

export default async function DashboardPage() {
  const transactions = await fetchTransactionSummaryGroup();
  const { device } = userAgent({ headers: await headers() });
  const viewport = device.type ?? 'desktop';
  return (
    <>
      <h4 className="mb-4">Transactions</h4>
      <TransactionsList transactions={transactions} viewport={viewport} />
    </>
  );
}
