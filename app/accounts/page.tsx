import { AccountListGrouped } from '@/app/components/accounts';
import { getAccounts } from '@/app/lib/sdk';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { cookies } from 'next/headers';

export default async function AccountsPage() {
  const cookieStore = await cookies();
  const { data: accounts } = await getAccounts({
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return (
    <main className="space-y-8">
      <section className="flex justify-between items-center">
        <h1 className="text-lg md:text-xl font-bold">Accounts</h1>
        <Button asChild size="sm">
          <Link href="/accounts/new">
            <PlusIcon /> <span className="hidden md:block">New</span>
          </Link>
        </Button>
      </section>
      {!accounts?.length ? (
        <p>You have no accounts added.</p>
      ) : (
        <AccountListGrouped accounts={accounts} />
      )}
    </main>
  );
}
