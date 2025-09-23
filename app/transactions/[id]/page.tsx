import { TransactionHeading } from '@/app/components/transactions';
import { EntryListGrouped } from '@/app/components/entries';
import { getTransactionsById, getTransactionsByIdEntries } from '@/app/lib/sdk';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function TransactionPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const { data: transaction } = await getTransactionsById({
    headers: {
      Cookie: cookieStore.toString(),
    },
    path: { id },
  });
  const { data: entries } = await getTransactionsByIdEntries({
    headers: {
      Cookie: cookieStore.toString(),
    },
    path: { id },
  });
  if (!transaction || !entries) {
    // A transaction needs to have entries
    notFound();
  }
  return (
    <main className="space-y-8">
      <section className="flex items-center justify-between">
        <div className="text-xl">
          <TransactionHeading transaction={transaction} showDate />
        </div>
        <Button asChild size="sm" variant="ghost">
          <Link href={`/transactions/${id}/edit`}>
            <PencilIcon /> <span className="hidden md:block">Edit</span>
          </Link>
        </Button>
      </section>
      <EntryListGrouped entries={entries} />
    </main>
  );
}
