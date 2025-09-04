'use client';

import { Transaction, TransactionType } from '@/app/lib/sdk';
import Link from 'next/link';
import { AccountMultilink } from '@/app/components/accounts/links';
import { dayjs, premiumDollarFormatter } from '@/app/lib/utils/format';

interface TransactionDetailProps {
  transaction: Transaction;
}

export const TransactionTitle = ({ transaction }: TransactionDetailProps) => {
  const key = transaction.type === 'transfer' ? 'to' : 'from';
  const accounts = transaction[key].accounts;
  return (
    <h3 className="font-bold">
      <Link href={`/transactions/${transaction.id}`}>
        <span className="inline underline-offset-4 hover:underline">
          {transaction.name}
        </span>
      </Link>{' '}
      {key} <AccountMultilink accounts={accounts} />
    </h3>
  );
};

interface TransactionSubtitleProps extends TransactionDetailProps {
  showDate?: boolean;
}

export const TransactionSubtitle = ({
  transaction,
  showDate,
}: TransactionSubtitleProps) => {
  let action: string;
  switch (transaction.type) {
    case TransactionType.INCOME:
      action = 'Deposited';
      break;
    case TransactionType.TRANSFER:
      action = 'Transfered';
      break;
    case TransactionType.EXPENSE:
      action = transaction.equity < 0 ? 'Charged' : 'Refunded';
      break;
  }
  const key = transaction.type === 'transfer' ? 'from' : 'to';
  const accounts = transaction[key].accounts;
  const equity = transaction[key].equity;
  return (
    <p className="text-muted-foreground">
      <small>
        {action} {premiumDollarFormatter.format(Math.abs(equity))} {key}{' '}
        <AccountMultilink accounts={accounts} />{' '}
        {!showDate ? '' : `on ${dayjs(transaction.date).format('LL')}`}
      </small>
    </p>
  );
};

type TransactionHeadingProps = TransactionSubtitleProps;

export const TransactionHeading = ({
  transaction,
  showDate,
}: TransactionHeadingProps) => (
  <div className="flex flex-col">
    <TransactionTitle transaction={transaction} />
    <TransactionSubtitle transaction={transaction} showDate={showDate} />
  </div>
);
