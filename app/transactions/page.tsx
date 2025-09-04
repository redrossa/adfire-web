import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { TransactionList } from '@/app/components/transactions';
import { getTransactions } from '@/app/lib/sdk';

export default async function TransactionsPage() {
  const { data: transactions } = await getTransactions({
    query: {
      order: 'desc',
    },
  });
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg md:text-xl font-bold">Transactions</h1>
        <Button asChild size="sm">
          <Link href="/transactions/new">
            <PlusIcon /> <span className="hidden md:block">New</span>
          </Link>
        </Button>
      </div>
      {!transactions?.length ? (
        <p>You have no transactions added.</p>
      ) : (
        <TransactionList transactions={transactions} />
      )}
    </>
  );
}
