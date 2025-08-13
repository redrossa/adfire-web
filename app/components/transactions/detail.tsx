'use client';

import { Entry, TransactionContext } from '@/app/lib/models/transactions';
import Link from 'next/link';
import { AccountLink, AccountLinkGroup } from '@/app/components/accounts/links';
import { isCredit, isDebit } from '@/app/lib/selectors/transactions';
import {
  dayjs,
  deltaDollarFormatter,
  premiumDollarFormatter,
} from '@/app/lib/utils/format';
import {
  CellContext,
  createColumnHelper,
  getCoreRowModel,
} from '@tanstack/table-core';
import { useReactTable } from '@tanstack/react-table';
import List from '@/app/components/list';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import { getBalance, getInitials, getLogo } from '@/app/lib/selectors/accounts';
import { useMemo } from 'react';
import { Badge } from '@/app/components/ui/badge';
import { cn } from '@/app/lib/utils';

interface TransactionDetailProps {
  context: TransactionContext;
}

export const TransactionEntryDetailCell = ({
  row,
}: CellContext<Entry, unknown>) => {
  const account = row.original.account;
  const initials = getInitials(account.name, true);
  const logo = account.domain && getLogo(account.domain);
  return (
    <div className="p-2 text-sm md:text-base flex gap-4 items-center">
      <Avatar className="size-8 border">
        <AvatarImage src={logo} alt={account.name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h3 className="font-bold">
          <AccountLink account={account} hideIcon />
        </h3>
        <p className="text-muted-foreground">
          <small>
            <span className="capitalize">{account.type}</span>
            {' • '}
            {dayjs(row.original.date).format('LL')}
          </small>
        </p>
      </div>
    </div>
  );
};

export const TransactionEntryDollarCell = ({
  row,
}: CellContext<Entry, unknown>) => {
  const amount = getBalance(
    row.original.amount,
    row.original.isCredit,
    row.original.account.type,
  );
  const bullish = 'bg-bullish/20 text-bullish';
  const bearish = 'bg-bearish/20 text-bearish';
  let color: string;
  if (
    row.original.account.type === 'expense' ||
    row.original.account.type === 'liability'
  ) {
    color = amount > 0 ? bearish : bullish;
  } else {
    color = amount > 0 ? bullish : bearish;
  }
  return (
    <div className="flex justify-end p-2">
      <Badge
        variant="secondary"
        className={cn(
          'p-2 text-muted-foreground min-w-20',
          amount !== 0 && color,
        )}
      >
        {deltaDollarFormatter.format(amount)}
      </Badge>
    </div>
  );
};

export const TransactionEntryList = ({ context }: TransactionDetailProps) => {
  const columnHelper = createColumnHelper<Entry>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'detail',
        cell: TransactionEntryDetailCell,
      }),
      columnHelper.display({
        id: 'balance',
        cell: TransactionEntryDollarCell,
      }),
    ],
    [columnHelper],
  );

  const credits = useMemo(
    () => context.transaction.entries.filter(isCredit),
    [context.transaction.entries],
  );
  const creditTable = useReactTable({
    data: credits,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const debits = useMemo(
    () => context.transaction.entries.filter(isDebit),
    [context.transaction.entries],
  );
  const debitTable = useReactTable({
    data: debits,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <p className="mb-2">
        <small>Credits</small>
      </p>
      <List table={creditTable} />
      <p className="mb-2 mt-4">
        <small>Debits</small>
      </p>
      <List table={debitTable} />
    </div>
  );
};

type TransactionTitleProps = TransactionDetailProps;

export const TransactionTitle = ({ context }: TransactionTitleProps) => (
  <h3 className="font-bold">
    <Link href={`/transactions/${context.transaction.id}`}>
      <span className="inline hover:underline cursor-pointer">
        {context.transaction.name}
      </span>
    </Link>{' '}
    from <AccountLinkGroup accounts={context.counterparties} />
  </h3>
);

interface TransactionSubtitleProps extends TransactionDetailProps {
  showDate?: boolean;
}

export const TransactionSubtitle = ({
  context,
  showDate,
}: TransactionSubtitleProps) => {
  const {
    transaction: { type },
    accounts,
    accountBalance,
    portfolioBalance,
  } = context;
  let action: string;
  switch (type) {
    case 'income':
      action = 'Deposited';
      break;
    case 'transfer':
      action = 'Transfered';
      break;
    case 'expense':
      action = portfolioBalance < 0 ? 'Charged' : 'Refunded';
      break;
  }
  return (
    <p className="text-muted-foreground">
      <small>
        {action} {premiumDollarFormatter.format(Math.abs(accountBalance))} to{' '}
        <AccountLinkGroup accounts={accounts} />{' '}
        {!showDate ? '' : `on ${dayjs(context.date).format('LL')}`}
      </small>
    </p>
  );
};

type TransactionHeadingProps = TransactionSubtitleProps;

export const TransactionHeading = ({
  context,
  showDate,
}: TransactionHeadingProps) => (
  <div className="flex flex-col">
    <TransactionTitle context={context} />
    <TransactionSubtitle context={context} showDate={showDate} />
  </div>
);
