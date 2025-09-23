import { AccountForm } from '@/app/components/accounts/edit';
import { headers } from 'next/headers';

export default async function AccountsNewPage() {
  const headersList = await headers();
  const referer = headersList.get('referer');
  const forwardPath = referer ? new URL(referer).pathname : undefined;
  return (
    <main className="space-y-6">
      <h1 className="text-lg md:text-xl font-bold">Add account</h1>
      <AccountForm forwardPath={forwardPath} />
    </main>
  );
}
