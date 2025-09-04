import { AccountDetail } from '@/app/components/accounts';
import { TransactionList } from '@/app/components/transactions';
import { getAccountsById, getAccountsByIdTransactions } from '@/app/lib/sdk';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AccountPage({ params }: Props) {
  const { id } = await params;
  const { data: account } = await getAccountsById({ path: { id } });
  const { data: transactions } = await getAccountsByIdTransactions({
    path: { id },
    query: { order: 'desc' },
  });
  if (!account) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-8">
      <AccountDetail account={account} />
      {!transactions?.length ? (
        <p>No transactions in this account.</p>
      ) : (
        <div>
          <h2 className="font-bold mb-2">Related transactions</h2>
          <TransactionList transactions={transactions} />
        </div>
      )}
    </div>
  );
}
