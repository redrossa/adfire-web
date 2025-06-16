import { ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { getAccounts } from '@/lib/services';
import { Button } from '@heroui/button';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Chip } from '@heroui/chip';
import { dollarFormatter } from '@/lib/utils';

export default async function AccountsPage() {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  const accounts = await getAccounts();

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
                      <h5>
                        {account.name}
                        <code className="text-base opacity-60">
                          #{account.mask}
                        </code>
                      </h5>
                      <small className="opacity-60">{account.holderName}</small>
                    </div>
                    <div className="flex gap-2 items-center ml-auto">
                      <Chip variant="flat" radius="md" size="lg">
                        <code>{dollarFormatter.format(account.amount)}</code>
                      </Chip>
                      <Button
                        disableRipple
                        isIconOnly
                        variant="light"
                        radius="full"
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
