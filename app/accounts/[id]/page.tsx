import { AccountDetail } from '@/app/components/accounts';
import { TransactionListGrouped } from '@/app/components/transactions';
import { getAccountsById, getAccountsByIdTransactions } from '@/app/lib/sdk';
import { notFound } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { PencilIcon, PlusIcon } from 'lucide-react';
import { cookies } from 'next/headers';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AccountPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const { data: account } = await getAccountsById({
    headers: {
      Cookie: cookieStore.toString(),
    },
    path: { id },
  });
  const { data: transactions } = await getAccountsByIdTransactions({
    headers: {
      Cookie: cookieStore.toString(),
    },
    path: { id },
    query: { order: 'desc' },
  });
  if (!account) {
    notFound();
  }
  return (
    <main className="space-y-8">
      <section className="flex items-center justify-between">
        <AccountDetail account={account} />
        <Button asChild size="sm" variant="ghost">
          <Link href={`/accounts/${id}/edit`}>
            <PencilIcon /> <span className="hidden md:block">Edit</span>
          </Link>
        </Button>
      </section>
      {!transactions?.length ? (
        <p>No transactions in this account.</p>
      ) : (
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Related transactions</h2>
            <Button asChild size="sm">
              <Link href="/transactions/new">
                <PlusIcon /> <span className="hidden md:block">New</span>
              </Link>
            </Button>
          </div>
          <TransactionListGrouped transactions={transactions} />
        </section>
      )}
    </main>
  );
}
