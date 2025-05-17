import { PencilIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { getAccounts } from '@/lib/services';
import { Button } from '@/components/button';

export default async function AccountsPage() {
  const accounts = await getAccounts();
  return (
    <>
      <div className="flex items-center justify-between">
        <h3>Accounts</h3>
        <Button asChild>
          <Link href="/accounts/new">
            <PlusIcon size={16} />
            Add accounts
          </Link>
        </Button>
      </div>
      <section className="mt-4">
        {!accounts.length ? (
          <p>
            You have no accounts on file. Add an account to start tracking
            transactions.
          </p>
        ) : (
          <div className="flex flex-col rounded-md">
            {accounts.map((account) => (
              <div
                key={account.name}
                className="p-4 flex items-center hover:bg-muted/50"
              >
                <div className="flex flex-col">
                  <h5>{account.name}</h5>
                  <small>
                    {account.users.length}{' '}
                    {account.users.length === 1 ? 'user' : 'users'}
                  </small>
                </div>
                <Button
                  className="rounded-full ml-auto"
                  variant="ghost"
                  size="icon"
                  asChild
                >
                  <Link href={`/accounts/${account.id}`}>
                    <PencilIcon
                      className="opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
