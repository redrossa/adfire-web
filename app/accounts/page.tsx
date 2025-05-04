import { ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@headlessui/react';
import Link from 'next/link';

interface Account {
  id: string;
  name: string;
  usersCount: number;
}

async function getAccounts(): Promise<Account[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/accounts`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export default async function AccountsPage() {
  const accounts = await getAccounts();
  return (
      <main>
        <div className="flex items-center justify-between">
          <h3>Accounts</h3>
          <Button
              as={Link}
              href="/accounts/new"
              className="inline-flex items-center gap-2 rounded-sm border border-solid border-transparent transition-colors bg-foreground font-medium text-background hover:bg-blue-600 py-2 px-4"
          >
            <PlusIcon className="w-6 h-6" />
            <p>Add accounts</p>
          </Button>
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
                        <small>{account.usersCount} {account.usersCount === 1 ? 'user' : 'users'}</small>
                      </div>
                      <Button className="ml-auto rounded-full hover:bg-gray-100 hover:text-inherit text-gray-700 transition p-4">
                        <ChevronRightIcon className="w-8 h-8" />
                      </Button>
                    </div>
                ))}
              </div>
          )}
        </section>
      </main>
  );
}