import { cookies, headers } from 'next/headers';
import {
  getAccounts,
  getTransactionsById,
  getTransactionsByIdEntries,
} from '@/app/lib/sdk';
import { notFound } from 'next/navigation';
import { TransactionForm } from '@/app/components/transactions/edit';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function TransactionsEditPage({ params }: Props) {
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

  const { data: accounts } = await getAccounts({
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  const headersList = await headers();
  const referer = headersList.get('referer');
  const forwardPath = referer ? new URL(referer).pathname : undefined;

  return (
    <main className="space-y-6">
      <h1 className="text-lg md:text-xl font-bold">Edit account</h1>
      <TransactionForm
        transaction={transaction}
        entries={entries}
        accounts={accounts}
        forwardPath={forwardPath}
      />
    </main>
  );
}
