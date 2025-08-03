'use client';

import {
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
import { useReactTable } from '@tanstack/react-table';
import { Chip } from '@heroui/chip';
import NextLink from 'next/link';
import { Account } from '@/app/lib/models/accounts';
import { Avatar } from '@heroui/avatar';
import { Transaction } from '@/app/lib/models/transactions';
import {
  groupListItems,
  identifyIsNetCredit,
  toListItem,
} from '@/app/ui/transactions/utils';
import { TransactionListItem } from '@/app/ui/transactions/models';
import GridList from '@/app/ui/grid-list';

interface TransactionsListProps {
  transactions: Transaction[];
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
    <p>
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
  <div className="flex flex-col gap-2">
    <Title transaction={row.original} />
    <Subtitle transaction={row.original} />
  </div>
);

const TransactionWorthCell = ({
  cell,
}: CellContext<TransactionListItem, number>) => {
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

  return <GridList table={table} />;
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
              <p className="mb-2 small">{dayjs(date).format('LL')}</p>
              <TransactionsList transactions={group} />
            </div>
          ),
      )}
    </div>
  );
};

export default TransactionsListScroll;
