import { Button } from '@headlessui/react';
import Link from 'next/link';
import { ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';
import Container from '@/components/Container';

const mockTransactions = [
  {
    name: 'Kroger Groceries',
    date: '2024-04-28',
    amount: -100,
    symbol: 'USD',
    from: [
      {
        account: 'Amex Gold',
        mask: '0001',
        amount: 100,
        symbol: 'USD',
        date: '2024-04-28'
      }
    ],
    to: [
      {
        account: 'Kroger',
        amount: 100,
        symbol: 'USD',
        date: '2024-04-30'
      }
    ]
  },
  {
    name: "Wendy's Wages",
    date: '2024-04-15',
    amount: 2200,
    symbol: 'USD',
    from: [
      {
        account: "Wendy's Hourly Wages",
        amount: 2000,
        symbol: 'USD',
        date: '2024-04-15'
      },
      {
        account: "Wendy's Bonus Wages",
        amount: 200,
        symbol: 'USD',
        date: '2024-04-15'
      }
    ],
    to: [
      {
        account: 'Chase Total Checking',
        mask: '0000',
        amount: 1500,
        symbol: 'USD',
        date: '2024-04-17'
      },
      {
        account: 'Federal Income Taxes',
        mask: '0000',
        amount: 700,
        symbol: 'USD',
        date: '2024-04-15'
      }
    ]
  }
];

export default function TransactionsPage() {
  const transactions = mockTransactions;
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
              <p>You have no transactions on file. Add a transaction to view your portfolio summary.</p>
          ) : (
              <Container className="flex flex-col divide-y">
                {transactions.map((transaction) => (
                    <div key={transaction.name} className="p-8 flex items-center">
                      <div className="flex flex-col">
                        <h5>{transaction.name}</h5>
                        <small>{transaction.date}</small>
                      </div>
                      <code className="ml-auto mr-2">{transaction.amount} {transaction.symbol}</code>
                      <Button className="rounded-full hover:bg-gray-100 hover:text-inherit text-gray-700 transition p-4">
                        <ChevronRightIcon className="w-8 h-8" />
                      </Button>
                    </div>
                ))}
              </Container>
          )}
        </section>
      </main>
  );
}
