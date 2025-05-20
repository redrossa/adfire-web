import Link from 'next/link';
import {
  ChevronRightIcon,
  PencilIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@heroui/button';
import { getTransactions } from '@/lib/services/transactions';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Chip } from '@heroui/chip';

export default async function TransactionsPage() {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  let transactions;
  try {
    transactions = await getTransactions();
  } catch {
    transactions = null;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h3>Transactions</h3>
        <Button
          as={Link}
          href="/transactions/new"
          color="primary"
          disableRipple
          startContent={
            <PlusIcon className="opacity-60 w-4 h-auto" aria-hidden />
          }
        >
          Add transactions
        </Button>
      </div>
      <section className="mt-4">
        {!transactions ? (
          <p>Failed to load transactions</p>
        ) : (
          <>
            {!transactions.length ? (
              <p>
                You have no transactions on file. Add a transaction to view your
                portfolio summary.
              </p>
            ) : (
              <div className="flex flex-col rounded-md">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 flex items-center">
                    <div className="flex flex-col">
                      <h5>{transaction.name}</h5>
                      <small>{transaction.date}</small>
                    </div>
                    <div className="flex gap-2 items-center ml-auto">
                      <Chip radius="md">
                        <code>${transaction.amount}</code>
                      </Chip>
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
                        href={`/transactions/${transaction.id}`}
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
