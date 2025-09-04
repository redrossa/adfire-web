'use client';

import {
  CellContext,
  createColumnHelper,
  getCoreRowModel,
} from '@tanstack/table-core';
import { useReactTable } from '@tanstack/react-table';
import { TransactionHeading } from '@/app/components/transactions/detail';
import dayjs from 'dayjs';
import List from '@/app/components/list';
import { useMemo } from 'react';
import { Badge } from '@/app/components/ui/badge';
import { cn } from '@/app/lib/utils';
import { deltaDollarFormatter } from '@/app/lib/utils/format';
import { Transaction } from '@/app/lib/sdk';

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionDetailCell = ({ row }: CellContext<Transaction, unknown>) => (
  <div className="p-2 text-sm md:text-base">
    <TransactionHeading transaction={row.original} />
  </div>
);

const TransactionDollarCell = ({ row }: CellContext<Transaction, unknown>) => {
  const amount = row.original.equity;
  const bullish = 'bg-bullish/20 text-bullish';
  const bearish = 'bg-bearish/20 text-bearish';
  const color = amount > 0 ? bullish : bearish;
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

const TransactionListGroup = ({ transactions }: TransactionsListProps) => {
  const columnHelper = createColumnHelper<Transaction>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'detail',
        cell: TransactionDetailCell,
      }),
      columnHelper.display({
        id: 'equity',
        cell: TransactionDollarCell,
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <List table={table} />;
};

export const TransactionList = ({ transactions }: TransactionsListProps) => {
  const grouped = Object.groupBy(transactions, (it) => it.date);
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(grouped).map(
        ([date, group]) =>
          group?.length && (
            <div key={date}>
              <p className="mb-2">
                <small>{dayjs(date).format('LL')}</small>
              </p>
              <TransactionListGroup transactions={group} />
            </div>
          ),
      )}
    </div>
  );
};
