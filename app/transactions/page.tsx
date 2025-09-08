import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { TransactionListGrouped } from '@/app/components/transactions';
import { getTransactions } from '@/app/lib/sdk';
import { cookies } from 'next/headers';

export default async function TransactionsPage() {
  const cookieStore = await cookies();
  const { data: transactions } = await getTransactions({
    headers: {
      Cookie: cookieStore.toString(),
    },
    query: {
      order: 'desc',
    },
  });
  return (
    <main className="space-y-8">
      <section className="flex justify-between items-center">
        <h1 className="text-lg md:text-xl font-bold">Transactions</h1>
        <Button asChild size="sm">
          <Link href="/transactions/new">
            <PlusIcon /> <span className="hidden md:block">New</span>
          </Link>
        </Button>
      </section>
      {!transactions?.length ? (
        <p>You have no transactions added.</p>
      ) : (
        <TransactionListGrouped transactions={transactions} />
      )}
    </main>
  );
}
