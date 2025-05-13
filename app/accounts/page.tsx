import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { IconButton, SolidButton } from '@/components/forms';
import { getAccounts } from '@/services';

export default async function AccountsPage() {
  const accounts = await getAccounts();
  return (
      <main>
        <div className="flex items-center justify-between">
          <h3>Accounts</h3>
          <SolidButton
              Icon={PlusIcon}
              className="mt-8"
              text="Add accounts"
              as={Link}
              href="/accounts/new"
          />
        </div>
        <section className="my-10">
          {!accounts.length ? (
              <p>You have no accounts on file. Add an account to start tracking transactions.</p>
          ) : (
              <div className="container flex flex-col divide-y">
                {accounts.map((account) => (
                    <div key={account.name} className="p-8 flex items-center">
                      <div className="flex flex-col">
                        <h5>{account.name}</h5>
                        <small>{account.users.length} {account.users.length === 1 ? 'user' : 'users'}</small>
                      </div>
                      <IconButton
                          className="ml-auto"
                          Icon={PencilIcon}
                          as={Link}
                          href={`/accounts/${account.id}`}
                      />
                    </div>
                ))}
              </div>
          )}
        </section>
      </main>
  );
}