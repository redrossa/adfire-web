import { fetchTransactions } from '@/app/lib/queries/transactions';
import TransactionsListScroll from '@/app/components/transactions/list';
import { contextualize } from '@/app/lib/selectors/transactions';

export default async function DashboardPage() {
  const transactions = await fetchTransactions();
  const contexts = transactions.map((t) => contextualize(t));
  console.log(contexts);
  return (
    <>
      <h1 className="mb-4 text-lg md:text-xl font-bold">Transactions</h1>
      <TransactionsListScroll contexts={contexts} />
    </>
  );
}
