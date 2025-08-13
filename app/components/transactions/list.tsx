'use client';

import {
  CellContext,
  createColumnHelper,
  getCoreRowModel,
} from '@tanstack/table-core';
import { useReactTable } from '@tanstack/react-table';
import { TransactionContext } from '@/app/lib/models/transactions';
import { TransactionHeading } from '@/app/components/transactions/detail';
import dayjs from 'dayjs';
import List from '@/app/components/list';
import { useMemo } from 'react';
import { Badge } from '@/app/components/ui/badge';
import { cn } from '@/app/lib/utils';
import { deltaDollarFormatter } from '@/app/lib/utils/format';

interface TransactionsListProps {
  contexts: TransactionContext[];
}

const TransactionDetailCell = ({
  row,
}: CellContext<TransactionContext, unknown>) => (
  <div className="p-2 text-sm md:text-base">
    <TransactionHeading context={row.original} />
  </div>
);

export const TransactionDollarCell = ({
  row,
}: CellContext<TransactionContext, unknown>) => {
  const isReferenced = row.original.reference;
  const amount = isReferenced
    ? row.original.referenceBalance
    : row.original.portfolioBalance;
  const bullish = 'bg-bullish/20 text-bullish';
  const bearish = 'bg-bearish/20 text-bearish';
  let color: string;
  if (isReferenced?.type === 'expense' || isReferenced?.type === 'liability') {
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

const TransactionsList = ({ contexts }: TransactionsListProps) => {
  const columnHelper = createColumnHelper<TransactionContext>();
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
    data: contexts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <List table={table} />;
};

const TransactionsListScroll = ({ contexts }: TransactionsListProps) => {
  const grouped = Object.groupBy(contexts, (it) => it.date);
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(grouped).map(
        ([date, group]) =>
          group?.length && (
            <div key={date}>
              <p className="mb-2">
                <small>{dayjs(date).format('LL')}</small>
              </p>
              <TransactionsList contexts={group} />
            </div>
          ),
      )}
    </div>
  );
};

export default TransactionsListScroll;
