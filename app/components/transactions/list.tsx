'use client';

import {
  cn,
  dayjs,
  deltaDollarFormatter,
  getInitials,
  premiumDollarFormatter,
} from '@/app/lib/utils';
import {
  CellContext,
  createColumnHelper,
  getCoreRowModel,
} from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import NextLink from 'next/link';
import { Account } from '@/app/lib/models/accounts';
import { Transaction } from '@/app/lib/models/transactions';
import {
  groupListItems,
  identifyIsNetCredit,
  toListItem,
} from '@/app/components/transactions/utils';
import { TransactionListItem } from '@/app/components/transactions/models';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';

interface TransactionsListProps {
  transactions: Transaction[];
}

const Link = ({ children, href }: { children: string; href: string }) => (
  <NextLink href={href}>
    <span className="inline hover:underline">{children}</span>
  </NextLink>
);

const AccountLink = ({ account: { name, logo } }: { account: Account }) => {
  const initials = getInitials(name)[0];
  return (
    <NextLink href="#">
      <span className="items-baseline inline-flex hover:underline rounded-md pl-0.5 gap-1 border-0 whitespace-nowrap">
        <Avatar className="w-[1em] h-[1em] border self-center">
          <AvatarImage src={logo} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {name}
      </span>
    </NextLink>
  );
};

const AccountLinkGroup = ({ accounts }: { accounts: Account[] }) => {
  if (accounts.length === 0) {
    return <>no accounts</>;
  } else if (accounts.length === 1) {
    return <AccountLink account={accounts[0]} />;
  } else if (accounts.length === 2) {
    return (
      <>
        <AccountLink account={accounts[0]} /> and{' '}
        <AccountLink account={accounts[1]} />
      </>
    );
  } else {
    return <>{accounts.length} accounts</>;
  }
};

const Title = ({
  transaction: { name, counterparties },
}: {
  transaction: TransactionListItem;
}) => (
  <p className="font-bold">
    <Link href="#">{name}</Link> from{' '}
    <AccountLinkGroup accounts={counterparties} />
  </p>
);

const Subtitle = ({ transaction }: { transaction: TransactionListItem }) => {
  const isNetCredit = identifyIsNetCredit(transaction);
  const { type, accounts, credit, debit } = transaction;
  let action: string, amount: number;
  switch (type) {
    case 'income':
      action = 'Deposited';
      amount = debit;
      break;
    case 'transfer':
      action = 'Transfered';
      amount = debit;
      break;
    case 'expense':
      action = isNetCredit ? 'Charged' : 'Refunded';
      amount = isNetCredit ? credit : debit;
      break;
  }
  return (
    <p className="text-muted-foreground">
      <small>
        {action} {premiumDollarFormatter.format(amount)} to{' '}
        <AccountLinkGroup accounts={accounts} />
      </small>
    </p>
  );
};

const TransactionSummaryCell = ({
  row,
}: CellContext<TransactionListItem, unknown>) => (
  <div className="flex flex-col p-2">
    <Title transaction={row.original} />
    <Subtitle transaction={row.original} />
  </div>
);

const TransactionWorthCell = ({
  cell,
}: CellContext<TransactionListItem, number>) => {
  const value = cell.getValue();
  const isNetZero = value === 0;
  return (
    <div className="flex justify-end p-2">
      <Badge
        variant="secondary"
        className={cn(
          'p-2 text-muted-foreground min-w-20',
          !isNetZero &&
            (value >= 0
              ? 'bg-bullish/20 text-bullish'
              : 'bg-bearish/20 text-bearish'),
        )}
      >
        {deltaDollarFormatter.format(value)}
      </Badge>
    </div>
  );
};

const TransactionsList = ({
  transactions,
}: {
  transactions: TransactionListItem[];
}) => {
  const columnHelper = createColumnHelper<TransactionListItem>();
  const columns = [
    columnHelper.display({
      id: 'summary',
      cell: TransactionSummaryCell,
    }),
    columnHelper.accessor(({ credit, debit }) => debit - credit, {
      id: 'worth',
      cell: TransactionWorthCell,
    }),
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border transition-colors overflow-hidden rounded-md">
      <Table>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const TransactionsListScroll = ({ transactions }: TransactionsListProps) => {
  const mapped = transactions.map(toListItem);
  const grouped = groupListItems(mapped);
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(grouped).map(
        ([date, group]) =>
          group?.length && (
            <div key={date}>
              <p className="mb-2">
                <small>{dayjs(date).format('LL')}</small>
              </p>
              <TransactionsList transactions={group} />
            </div>
          ),
      )}
    </div>
  );
};

export default TransactionsListScroll;
