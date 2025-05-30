import { ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { getAccounts } from '@/lib/services';
import { Button } from '@heroui/button';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AccountsPage() {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  let accounts;
  try {
    accounts = await getAccounts();
  } catch {
    accounts = null;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h3>Accounts</h3>
        <Button
          as={Link}
          href="/accounts/new"
          color="primary"
          disableRipple
          startContent={
            <PlusIcon className="opacity-60 w-4 h-auto" aria-hidden />
          }
        >
          Add accounts
        </Button>
      </div>
      <section className="mt-4">
        {!accounts ? (
          <p>Failed to load accounts</p>
        ) : (
          <>
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
                    className="p-4 flex items-center hover:bg-default/20"
                  >
                    <div className="flex flex-col">
                      <h5>{account.name}</h5>
                      <small>
                        {account.users.length}{' '}
                        {account.users.length === 1 ? 'user' : 'users'}
                      </small>
                    </div>
                    <Button
                      disableRipple
                      isIconOnly
                      variant="light"
                      radius="full"
                      className="ml-auto"
                      startContent={
                        <ChevronRightIcon
                          className="opacity-60 w-4 h-auto"
                          aria-hidden
                        />
                      }
                      as={Link}
                      href={`/accounts/${account.id}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
