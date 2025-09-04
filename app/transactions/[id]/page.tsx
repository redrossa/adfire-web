import { TransactionHeading } from '@/app/components/transactions';
import { EntryList } from '@/app/components/entries';
import { getTransactionsById, getTransactionsByIdEntries } from '@/app/lib/sdk';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function TransactionPage({ params }: Props) {
  const { id } = await params;
  const { data: transaction } = await getTransactionsById({ path: { id } });
  const { data: entries } = await getTransactionsByIdEntries({ path: { id } });
  if (!transaction || !entries) {
    // A transaction needs to have entries
    notFound();
  }
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xl">
        <TransactionHeading transaction={transaction} showDate />
      </span>
      <EntryList entries={entries} />
    </div>
  );
}
