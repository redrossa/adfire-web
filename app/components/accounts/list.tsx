'use client';

import { Account } from '@/app/lib/sdk';
import List from '@/app/components/list';
import {
  CellContext,
  createColumnHelper,
  getCoreRowModel,
} from '@tanstack/table-core';
import { useMemo } from 'react';
import { useReactTable } from '@tanstack/react-table';
import { getInitials, getLogo } from '@/app/lib/utils/accounts';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import { AccountLink } from '@/app/components/accounts/links';
import { pluralize } from 'pluralize';

interface AccountsListProps {
  accounts: Account[];
}

const AccountDetailCell = ({ row }: CellContext<Account, unknown>) => {
  const account = row.original;
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
          <small className="capitalize">{account.type}</small>
        </p>
      </div>
    </div>
  );
};

const AccountListGroup = ({ accounts }: AccountsListProps) => {
  const columnHelper = createColumnHelper<Account>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'detail',
        cell: AccountDetailCell,
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable({
    data: accounts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <List table={table} />;
};

export const AccountList = ({ accounts }: AccountsListProps) => {
  const grouped = Object.groupBy(accounts, (it) => it.type);
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(grouped).map(
        ([type, group]) =>
          group?.length && (
            <div key={type}>
              <p className="mb-2 capitalize">
                <small>{pluralize(type)}</small>
              </p>
              <AccountListGroup accounts={group} />
            </div>
          ),
      )}
    </div>
  );
};
