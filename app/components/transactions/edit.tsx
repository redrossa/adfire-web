'use client';

import { z } from 'zod';
import { Button } from '@/app/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Account,
  AccountType,
  deleteTransactionsById,
  Entry,
  EntryInput,
  postTransactions,
  putTransactionsById,
  Transaction,
} from '@/app/lib/sdk';
import {
  zEntryInput,
  zTransactionInput,
  zTransactionType,
} from '@/app/lib/sdk/zod.gen';
import { cn } from '@/app/lib/utils';
import {
  Control,
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  CellContext,
  createColumnHelper,
  getCoreRowModel,
} from '@tanstack/table-core';
import React, { useMemo, useState } from 'react';
import { useReactTable } from '@tanstack/react-table';
import List from '@/app/components/list';
import { dayjs } from '@/app/lib/utils/format';
import { AccountLink } from '@/app/components/accounts';
import { Popover, PopoverContent } from '../ui/popover';
import { PopoverTrigger } from '@/app/components/ui/popover';
import { CalendarIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import pluralize from 'pluralize';

interface Props {
  transaction?: Transaction;
  entries?: Entry[];
  accounts?: Account[];
  forwardPath?: string;
}

const defaultEntry: EntryInput = {
  accountId: '',
  amount: '' as any,
  date: '',
};

export function TransactionForm({
  transaction,
  entries,
  accounts,
  forwardPath,
}: Readonly<Props>) {
  const router = useRouter();
  const form = useForm<z.infer<typeof zTransactionInput>>({
    resolver: zodResolver(zTransactionInput),
    defaultValues: {
      name: transaction?.name ?? '',
      type: transaction?.type ?? ('' as any),
      entries: entries?.length
        ? entries.map((e) => ({
            date: e.date,
            amount: e.amount,
            accountId: e.account.id,
          }))
        : [defaultEntry, defaultEntry],
    },
  });

  const entriesForm = useFieldArray({
    control: form.control,
    name: 'entries',
  });
  const columnHelper = createColumnHelper<z.infer<typeof zEntryInput>>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'detail',
        cell: EntryDetailCell,
      }),
    ],
    [columnHelper],
  );
  const table = useReactTable({
    meta: {
      accounts,
      control: form.control,
      fieldArray: entriesForm,
    },
    data: entriesForm.fields,
    columns,
    getRowId: (_row, index) => entriesForm.fields[index].id,
    getCoreRowModel: getCoreRowModel(),
  });

  const onSubmit = async (values: z.infer<typeof zTransactionInput>) => {
    const { error } = !transaction
      ? await postTransactions({
          credentials: 'include',
          body: values,
        })
      : await putTransactionsById({
          credentials: 'include',
          path: { id: transaction.id },
          body: values,
        });

    if (error) {
      handleError(error);
    } else {
      routeForward();
    }
  };

  const handleDelete = async () => {
    if (!transaction) {
      return;
    }

    const { error } = await deleteTransactionsById({
      credentials: 'include',
      path: { id: transaction.id },
    });

    if (error) {
      handleError(error);
    } else {
      routeForward();
    }
  };

  const handleError = (error: unknown) => {
    const message = JSON.stringify(error);
    console.error(`Form submission failed: ${message}`);
    form.setError('root.serverError', {
      message,
    });
  };

  const routeForward = () => {
    router.push(forwardPath ?? '/accounts');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl className="w-full">
                <Input placeholder="Ex. Groceries" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger className="text-base" tabIndex={0}>
                    <SelectValue placeholder="Select a transaction type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {zTransactionType.options.map((type) => (
                    <SelectItem key={type} value={type} className="text-base">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <FormLabel>Entries</FormLabel>
          <List table={table} />
          <Button
            className="ml-auto mr-0 md:ml-0 md:mr-auto"
            tabIndex={0}
            type="button"
            variant="outline"
            onClick={() => entriesForm.append(defaultEntry)}
          >
            <PlusIcon /> Add
          </Button>
        </div>

        <div className="flex gap-4 flex-row md:flex-row-reverse mt-8">
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className={cn(!transaction ? 'hidden' : 'block')}
          >
            Delete
          </Button>
          <Button
            type="button"
            onClick={routeForward}
            variant="ghost"
            className="ml-auto mr-0 md:ml-0 md:mr-auto"
          >
            Cancel
          </Button>
          <Button tabIndex={0} type="submit">
            {transaction ? 'Save' : 'Create'}
          </Button>
        </div>
        {!!form.formState.errors.root?.serverError && (
          <FormMessage>Something went wrong, please try again.</FormMessage>
        )}
      </form>
    </Form>
  );
}

const EntryDetailCell = ({
  row,
  table,
}: CellContext<z.infer<typeof zEntryInput>, unknown>) => {
  const control: Control<z.infer<typeof zTransactionInput>> | undefined = (
    table.options.meta as any
  )?.control;
  const fieldArray: UseFieldArrayReturn = (table.options.meta as any)
    ?.fieldArray;
  const accounts: Account[] = (table.options.meta as any)?.accounts ?? [];
  const grouped = Object.groupBy(accounts, (a) => a.type);
  const [dateOpen, setDateOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4 flex-1">
      <FormField
        control={control}
        name={`entries.${row.index}.accountId`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="text-base w-full" tabIndex={0}>
                <SelectValue placeholder="Select an account" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(AccountType).map(
                  (type) =>
                    !!grouped[type]?.length && (
                      <SelectGroup key={type}>
                        <SelectLabel className="capitalize">
                          {pluralize(type)}
                        </SelectLabel>
                        {grouped[type]?.map((option) => (
                          <SelectItem
                            key={option.id}
                            value={option.id}
                            className="text-base"
                          >
                            <AccountLink account={option} withLogo />
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ),
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-4">
        <FormField
          control={control}
          name={`entries.${row.index}.date`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Date</FormLabel>
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      tabIndex={0}
                      variant="outline"
                      className={cn(
                        'pl-3 text-left font-normal flex justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        dayjs(field.value).format('LL')
                      ) : (
                        <span>Select date</span>
                      )}
                      <CalendarIcon className="h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={(date) => {
                      if (date) {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          '0',
                        ); // Month is 0-indexed
                        const day = String(date.getDate()).padStart(2, '0');
                        const formattedDate = `${year}-${month}-${day}`;
                        field.onChange(formattedDate);
                      }
                      setDateOpen(false);
                    }}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`entries.${row.index}.amount`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="0.00"
                    type="text"
                    className="peer ps-6"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                    $
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button
        type="button"
        variant="ghost"
        className="ml-0 mr-auto md:ml-auto md:mr-0"
        onClick={() => fieldArray.remove(row.index)}
      >
        <TrashIcon /> Delete
      </Button>
    </div>
  );
};
