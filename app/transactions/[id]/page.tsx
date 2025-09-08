import { TransactionHeading } from '@/app/components/transactions';
import { EntryListGrouped } from '@/app/components/entries';
import { getTransactionsById, getTransactionsByIdEntries } from '@/app/lib/sdk';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

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
      <section className="text-xl">
        <TransactionHeading transaction={transaction} showDate />
      </section>
      <EntryListGrouped entries={entries} />
    </main>
  );
}
