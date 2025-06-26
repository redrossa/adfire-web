import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import {
  getTransaction,
  getTransactionAccounts,
} from '@/lib/services/transactions';
import { TransactionEntry } from '@/lib/models';
import { Button } from '@heroui/button';
import Link from 'next/link';
import { ChevronRightIcon, PencilIcon } from '@heroicons/react/24/outline';
import {
  dayjs,
  deltaDollarFormatter,
  premiumDollarFormatter,
} from '@/lib/utils';
import DollarChip from '@/components/DollarChip';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function EditTransactionPage({ params }: Props) {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  const { id } = await params;
  const transaction = await getTransaction(id);
  const accounts = await getTransactionAccounts(id);

  const accountMap = Object.fromEntries(accounts.map((a) => [a.id, a]));

  const totalAmount = transaction.entries
    .map((e) => e.amount)
    .filter((a) => a >= 0)
    .reduce((a, b) => a + b, 0);

  const userAmounts = transaction.entries
    .filter((e) => !accountMap[e.accountId!]?.isMerchant)
    .map((e) => e.amount)
    .reduce((a, b) => a + b, 0);

  type AccountsAmountMap = { [accountId: string]: number };
  const amountsByAccount = transaction.entries
    .filter((e) => !accountMap[e.accountId!]?.isMerchant)
    .reduce((acc, { accountId, amount }) => {
      acc[accountId!] = (acc[accountId!] || 0) + amount;
      return acc;
    }, {} as AccountsAmountMap);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3>{transaction.name}</h3>
          <p>{dayjs(transaction.date).format('LL')}</p>
        </div>
        <Button
          as={Link}
          href={`/transactions/${id}/edit`}
          disableRipple
          startContent={
            <PencilIcon className="opacity-60 w-4 h-auto" aria-hidden />
          }
        >
          Edit
        </Button>
      </div>
      <section className="mt-4 flex flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="flex flex-row justify-between">
            <div>
              <p>Total amount transacted</p>
              <h4>{premiumDollarFormatter.format(totalAmount)}</h4>
            </div>
            <div className="text-right">
              <p>Your net change</p>
              <h4 className={userAmounts >= 0 ? 'text-success' : 'text-danger'}>
                {deltaDollarFormatter.format(userAmounts)}
              </h4>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            {Object.entries(amountsByAccount).map(([accountId, amount]) => (
              <div key={accountId} className="flex justify-between">
                <h5>{accountMap[accountId].name}</h5>
                <DollarChip amount={amount} isDelta variant="light" />
              </div>
            ))}
          </CardBody>
        </Card>
      </section>
      <section className="mt-4 flex flex-col gap-4">
        <h4>Entries</h4>
        {transaction.entries.map((entry: TransactionEntry) => (
          <div
            key={entry.id}
            className="p-2 flex items-center hover:bg-default/20"
          >
            <div className="flex flex-col">
              <h5>{accountMap[entry.accountId!].name}</h5>
              <small>{dayjs(entry.date).format('LL')}</small>
            </div>
            <div className="flex gap-2 items-center ml-auto">
              <DollarChip amount={entry.amount} isDelta />
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
                href={`/accounts/${entry.accountId}`}
              />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
