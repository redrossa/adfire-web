import { TransactionForm } from '@/app/components/transactions/edit';
import { cookies, headers } from 'next/headers';
import { getAccounts } from '@/app/lib/sdk';

export default async function TransactionsNewPage() {
  const cookieStore = await cookies();
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
      <h1 className="text-lg md:text-xl font-bold">Add transaction</h1>
      <TransactionForm accounts={accounts} forwardPath={forwardPath} />
    </main>
  );
}
