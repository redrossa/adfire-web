'use client';

import {
  dayjs,
  deltaDollarFormatter,
  getInitials,
  premiumDollarFormatter,
} from '@/app/lib/utils';
import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core';
import { flexRender, useReactTable } from '@tanstack/react-table';
import { Chip } from '@heroui/chip';
import NextLink from 'next/link';
import { Account } from '@/app/lib/models/accounts';
import { Avatar } from '@heroui/avatar';
import {
  TransactionSummary,
  TransactionSummaryGroup,
} from '@/app/lib/models/transactions';
import isEqual from 'react-fast-compare';

interface TransactionsListProps {
  transactions: TransactionSummaryGroup[];
}

const Link = ({ children, href }: { children: string; href: string }) => (
  <NextLink href={href}>
    <span className="inline hover:underline">{children}</span>
  </NextLink>
);

const AccountLink = ({ account: { name, logo } }: { account: Account }) => (
  <NextLink href="#">
    <span className="items-baseline inline-flex hover:underline rounded-md pl-0.5 gap-1 border-0 whitespace-nowrap">
      <Avatar
        classNames={{
          base: 'w-2.5 h-2.5 m-0 text-[8px] ring-offset-0 ring-1',
        }}
        name={getInitials(name)[0]}
        src={logo}
        isBordered
      />
      {name}
    </span>
  </NextLink>
);

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
  transaction: { name, merchants },
}: {
  transaction: TransactionSummary;
}) => (
  <p className="font-bold">
    <Link href="#">{name}</Link> from <AccountLinkGroup accounts={merchants} />
  </p>
);

const Subtitle = ({
  transaction: {
    type,
    creditAmount,
    debitAmount,
    creditAccounts,
    debitAccounts,
  },
}: {
  transaction: TransactionSummary;
}) => {
  if (type === 'income') {
    return (
      <small className="text-foreground-500">
        Debited {premiumDollarFormatter.format(debitAmount)}{' '}
        {debitAccounts.length === 1 ? 'to' : 'among'}{' '}
        <AccountLinkGroup accounts={debitAccounts} />
      </small>
    );
  } else if (type === 'expense') {
    if (debitAmount === 0) {
      return (
        <small className="text-foreground-500">
          Credited {premiumDollarFormatter.format(creditAmount)}{' '}
          {creditAccounts.length === 1 ? 'from' : 'from among'}{' '}
          <AccountLinkGroup accounts={creditAccounts} />
        </small>
      );
    } else {
      const RefundedTo = () => (
        <>
          Refunded {premiumDollarFormatter.format(debitAmount)}{' '}
          {debitAccounts.length === 1 ? 'to' : 'among'}{' '}
          <AccountLinkGroup accounts={debitAccounts} />
        </>
      );

      const OutOf = () =>
        debitAmount !== creditAmount && (
          <>out of {premiumDollarFormatter.format(creditAmount)}</>
        );

      const CreditedFrom = () =>
        !isEqual(debitAccounts, creditAccounts) && (
          <>
            originally credited{' '}
            {creditAccounts.length === 1 ? 'from' : 'from among'}{' '}
            <AccountLinkGroup accounts={creditAccounts} />
          </>
        );

      return (
        <small className="text-foreground-500">
          <RefundedTo /> <OutOf /> <CreditedFrom />
        </small>
      );
    }
  }
  return <small className="text-foreground-500">{type}</small>;
};

const TransactionsGroup = ({
  transactions,
}: {
  transactions: TransactionSummary[];
}) => {
  const columnHelper = createColumnHelper<TransactionSummary>();
  const columns = [
    columnHelper.display({
      id: 'summary',
      cell: ({ row }) => (
        <div className="flex flex-col gap-2">
          <Title transaction={row.original} />
          <Subtitle transaction={row.original} />
        </div>
      ),
    }),
    columnHelper.accessor((row) => row.debitAmount - row.creditAmount, {
      id: 'worth',
      cell: ({ cell }) => {
        const value = cell.getValue();
        const isNetZero = value === 0;
        const color = value >= 0 ? 'success' : 'danger';
        return (
          <div className="flex justify-end">
            <Chip
              variant="flat"
              radius="md"
              size="md"
              color={!isNetZero ? color : undefined}
            >
              {deltaDollarFormatter.format(value)}
            </Chip>
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border border-foreground-200 dark:border-foreground-100 rounded-md">
      <table className="w-full table-auto border-collapse">
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-foreground-100/50 dark:hover:bg-foreground-50/50 [&:not(:last-child)]:border-b border-foreground-200 dark:border-foreground-100 group"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-4 group-first:first:rounded-tl-md group-first:last:rounded-tr-md group-last:first:rounded-bl-md group-last:last:rounded-br-md"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TransactionsList = ({ transactions }: TransactionsListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {transactions.map((group) => (
        <div key={group.date}>
          <p className="mb-2 small">{dayjs(group.date).format('LL')}</p>
          <TransactionsGroup transactions={group.summaries} />
        </div>
      ))}
    </div>
  );
};

export default TransactionsList;
