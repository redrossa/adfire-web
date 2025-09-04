'use client';

import { Entry } from '@/app/lib/sdk';
import {
  CellContext,
  createColumnHelper,
  getCoreRowModel,
} from '@tanstack/table-core';
import { getInitials, getLogo } from '@/app/lib/utils/accounts';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import { AccountLink } from '@/app/components/accounts/links';
import { dayjs, deltaDollarFormatter } from '@/app/lib/utils/format';
import { Badge } from '@/app/components/ui/badge';
import { cn } from '@/app/lib/utils';
import { useMemo } from 'react';
import { isCredit, isInternal } from '@/app/lib/utils/entries';
import { useReactTable } from '@tanstack/react-table';
import List from '@/app/components/list';

interface EntriesListProps {
  entries: Entry[];
}

const EntryDetailCell = ({ row }: CellContext<Entry, unknown>) => {
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

const EntryDollarCell = ({ row }: CellContext<Entry, unknown>) => {
  const bullish = 'bg-bullish/20 text-bullish';
  const bearish = 'bg-bearish/20 text-bearish';
  let color: string | undefined;
  if (isInternal(row.original)) {
    color = isCredit(row.original) ? bearish : bullish;
  }
  return (
    <div className="flex justify-end p-2">
      <Badge
        variant="secondary"
        className={cn('p-2 text-muted-foreground min-w-20', color)}
      >
        {deltaDollarFormatter.format(row.original.amount)}
      </Badge>
    </div>
  );
};

const EntryListGroup = ({ entries }: EntriesListProps) => {
  const columnHelper = createColumnHelper<Entry>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'detail',
        cell: EntryDetailCell,
      }),
      columnHelper.display({
        id: 'balance',
        cell: EntryDollarCell,
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data: entries,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <List table={table} />;
};

export const EntryList = ({ entries }: EntriesListProps) => {
  const keys = ['Credits', 'Debits'] as const;
  const grouped = Object.groupBy(entries, (it) =>
    isCredit(it) ? 'Credits' : 'Debits',
  );
  return (
    <div className="flex flex-col gap-4">
      {keys.map(
        (key) =>
          grouped[key]?.length && (
            <div key={key}>
              <p className="mb-2">
                <small>{key}</small>
              </p>
              <EntryListGroup entries={grouped[key]} />
            </div>
          ),
      )}
    </div>
  );
};
