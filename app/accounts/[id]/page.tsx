import {
  getAccount,
  getAccountBalance,
  getAccountTransactions,
} from '@/lib/services';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Button } from '@heroui/button';
import Link from 'next/link';
import { ChevronRightIcon, PencilIcon } from '@heroicons/react/24/outline';
import Chart from '@/components/Chart';
import { dayjs } from '@/lib/utils';
import DollarChip from '@/components/DollarChip';

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function AccountDetailPage({ params }: Props) {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  const { id } = await params;
  const account = await getAccount(id);
  const balance = await getAccountBalance(id);
  const transactions = await getAccountTransactions(id);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3>{account.name}</h3>
          <p>
            {account.holderName}
            <code>#{account.mask}</code>
          </p>
        </div>
        <Button
          as={Link}
          href={`/accounts/${id}/edit`}
          disableRipple
          startContent={
            <PencilIcon className="opacity-60 w-4 h-auto" aria-hidden />
          }
        >
          Edit
        </Button>
      </div>
      <section className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Chart data={balance} />
        </div>
        <div className="flex flex-col gap-2">
          <h4>Transactions</h4>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-2 flex items-center hover:bg-default/20"
              >
                <div className="flex flex-col">
                  <h5>{transaction.name}</h5>
                  <small>{dayjs(transaction.date).format('LL')}</small>
                </div>
                <div className="flex gap-2 items-center ml-auto">
                  <DollarChip amount={transaction.amount} isDelta />
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
            ))
          ) : (
            <p>No transactions with this account yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
