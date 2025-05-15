import { Button } from '@headlessui/react';
import Link from 'next/link';
import { ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  symbol: string;
}

async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/transactions`,
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export default async function TransactionsPage() {
  const transactions = await getTransactions();
  return (
    <main>
      <div className="flex items-center justify-between">
        <h3>Transactions</h3>
        <Button
          as={Link}
          href="/transactions/new"
          className="inline-flex items-center gap-2 rounded-sm border border-solid border-transparent transition-colors bg-foreground font-medium text-background hover:bg-blue-600 py-2 px-4"
        >
          <PlusIcon className="w-6 h-6" />
          <p>Add transactions</p>
        </Button>
      </div>
      <section className="my-10">
        {!transactions.length ? (
          <p>
            You have no transactions on file. Add a transaction to view your
            portfolio summary.
          </p>
        ) : (
          <div className="container flex flex-col divide-y">
            {transactions.map((transaction) => (
              <div key={transaction.name} className="p-8 flex items-center">
                <div className="flex flex-col">
                  <h5>{transaction.name}</h5>
                  <small>{transaction.date}</small>
                </div>
                <code className="ml-auto mr-2">
                  {transaction.amount} {transaction.symbol}
                </code>
                <Button className="rounded-full hover:bg-gray-100 hover:text-inherit text-gray-700 transition p-4">
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
