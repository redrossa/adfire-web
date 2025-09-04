import { AccountList } from '@/app/components/accounts';
import { getAccounts, InternalAccountType } from '@/app/lib/sdk';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export default async function AccountsPage() {
  const { data: accounts } = await getAccounts({});
  const filtered = accounts?.filter((a) =>
    Object.values(InternalAccountType).includes(a.type as any),
  );
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg md:text-xl font-bold">Accounts</h1>
        <Button asChild size="sm">
          <Link href="/accounts/new">
            <PlusIcon /> <span className="hidden md:block">New</span>
          </Link>
        </Button>
      </div>
      {!filtered?.length ? (
        <p>You have no accounts added.</p>
      ) : (
        <AccountList accounts={filtered} />
      )}
    </>
  );
}
