'use client';

import {
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { Fragment, useEffect, useState } from 'react';
import { createMerchant, getAccounts } from '@/lib/services';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { cn } from '@/lib/utils';
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from '@/lib/services/transactions';
import { useRouter } from 'next/navigation';
import { Transaction } from '@/lib/models';
import AccountSelector, {
  AccountOption,
  mapToAccountOptions,
} from '../../components/AccountSelector';
import DateField from '@/components/DateField';
import DollarField from '@/components/DollarField';

export interface TransactionEntryForm {
  id?: string;
  account: AccountOption | null;
  date: string;
  amount: number;
}

export interface TransactionForm {
  id?: string;
  name: string;
  debits: TransactionEntryForm[];
  credits: TransactionEntryForm[];
}

interface Props {
  transactionForm?: TransactionForm;
}

const emptyEntry: TransactionEntryForm = {
  account: null,
  date: '',
  amount: null as any,
};

const mapToTransaction = (
  transactionForm: TransactionForm,
  accountOptions: { [key: string]: AccountOption },
): Transaction => {
  return {
    id: transactionForm.id,
    name: transactionForm.name,
    debits: transactionForm.debits.map((e) => ({
      id: e.id,
      accountUserId:
        e.account?.text && e.account.text in accountOptions
          ? accountOptions[e.account.text].userId
          : null,
      amount: e.amount,
      date: e.date,
    })),
    credits: transactionForm.credits.map((e) => ({
      id: e.id,
      accountUserId:
        e.account?.text && e.account.text in accountOptions
          ? accountOptions[e.account.text].userId
          : null,
      amount: e.amount,
      date: e.date,
    })),
  };
};

const TransactionEditor = ({ transactionForm }: Props) => {
  const router = useRouter();
  const [accountOptions, setAccountOptions] = useState<AccountOption[]>([]);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TransactionForm>({
    defaultValues: !transactionForm
      ? { debits: [emptyEntry], credits: [emptyEntry] }
      : { ...transactionForm },
  });

  const {
    fields: debitFields,
    append: debitAppend,
    remove: debitRemove,
  } = useFieldArray({
    control,
    name: 'debits',
  });

  const {
    fields: creditFields,
    append: creditAppend,
    remove: creditRemove,
  } = useFieldArray({
    control,
    name: 'credits',
  });

  const onSubmit: SubmitHandler<TransactionForm> = async (data) => {
    const isNew = !transactionForm?.id;
    const service = isNew ? createTransaction : updateTransaction;

    const accountOptionsGroup = Object.groupBy(
      data.debits
        .concat(data.credits)
        .map((o) => o.account)
        .filter((a) => !!a),
      (a) => a?.text,
    );

    const accountOptions: { [key: string]: AccountOption } = {};

    for (const [key, options] of Object.entries(accountOptionsGroup)) {
      const found = options?.find((o) => !o.isNew);
      if (found) {
        accountOptions[key] = found;
        continue;
      }

      try {
        const newAccount = await createMerchant(key);
        accountOptions[key] = mapToAccountOptions(newAccount)[0];
      } catch (err) {
        setError('root', { message: (err as Error).message });
        return;
      }
    }

    const transaction: Transaction = mapToTransaction(data, accountOptions);

    try {
      await service(transaction);
      router.push('/transactions');
    } catch (err) {
      setError('root', { message: (err as Error).message });
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      router.push('/transactions');
    } catch (err) {
      setError('root', { message: (err as Error).message });
    }
  };

  const initData = async () => {
    let accountOptions: AccountOption[];
    try {
      const accounts = await getAccounts();
      accountOptions = accounts.flatMap((a) => mapToAccountOptions(a));
    } catch {
      accountOptions = [];
    }
    setAccountOptions(accountOptions);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field }) => (
          <Input
            value={field.value}
            onValueChange={field.onChange}
            onBlur={field.onBlur}
            variant="faded"
            label="Transaction Name"
            labelPlacement="outside"
            placeholder="Groceries"
            classNames={{
              label: 'h6',
              input: `p`,
            }}
            isInvalid={!!errors.name}
            color={errors.name ? 'danger' : 'default'}
            errorMessage={errors.name?.message}
          />
        )}
      />
      <div className="mt-8 flex items-center gap-4">
        <h6>From</h6>
        <hr className="flex-1 border-foreground" />
      </div>
      <div className="mt-8 grid grid-cols-[3fr_1fr_1fr_auto] gap-y-2 gap-x-4">
        <h6
          className={cn({
            'text-danger': errors.debits?.some?.((u) => u?.account),
          })}
        >
          Account
        </h6>
        <h6
          className={cn({
            'text-danger': errors.debits?.some?.((u) => u?.date),
          })}
        >
          Date
        </h6>
        <h6
          className={cn('col-span-2', {
            'text-danger': errors.debits?.some?.((u) => u?.amount),
          })}
        >
          Amount
        </h6>
        {debitFields.map((field, index) => (
          <Fragment key={field.id}>
            <AccountSelector
              options={accountOptions}
              control={control}
              name={`debits.${index}.account`}
              rules={{ required: 'Account is required' }}
              errorMessage={errors?.debits?.[index]?.account?.message}
            />
            <DateField
              control={control}
              name={`debits.${index}.date`}
              errorMessage={errors?.debits?.[index]?.date?.message}
            />
            <DollarField
              control={control}
              name={`debits.${index}.amount`}
              errorMessage={errors?.debits?.[index]?.amount?.message}
            />
            <Button
              disableRipple
              isIconOnly
              variant="light"
              radius="full"
              aria-label="Delete debit entry"
              onPress={() => debitRemove(index)}
              isDisabled={debitFields.length === 1}
            >
              <TrashIcon className="opacity-60 w-4 h-auto" aria-hidden />
            </Button>
          </Fragment>
        ))}
      </div>
      <Button
        disableRipple
        variant="light"
        onPress={() => debitAppend(emptyEntry)}
        startContent={
          <PlusIcon className="opacity-60 w-4 h-auto" aria-hidden />
        }
        className="my-4"
      >
        Add debits
      </Button>
      <div className="mt-8 flex items-center gap-4">
        <h6>To</h6>
        <hr className="flex-1 border-foreground" />
      </div>
      <div className="mt-8 grid grid-cols-[3fr_1fr_1fr_auto] gap-y-2 gap-x-4">
        <h6
          className={cn({
            'text-danger': errors.credits?.some?.((u) => u?.account),
          })}
        >
          Account
        </h6>
        <h6
          className={cn({
            'text-danger': errors.credits?.some?.((u) => u?.date),
          })}
        >
          Date
        </h6>
        <h6
          className={cn('col-span-2', {
            'text-danger': errors.credits?.some?.((u) => u?.amount),
          })}
        >
          Amount
        </h6>
        {creditFields.map((field, index) => (
          <Fragment key={field.id}>
            <AccountSelector
              options={accountOptions}
              control={control}
              name={`credits.${index}.account`}
              errorMessage={errors?.credits?.[index]?.account?.message}
            />
            <DateField
              control={control}
              name={`credits.${index}.date`}
              errorMessage={errors?.credits?.[index]?.date?.message}
            />
            <DollarField
              control={control}
              name={`credits.${index}.amount`}
              errorMessage={errors?.credits?.[index]?.amount?.message}
            />
            <Button
              disableRipple
              isIconOnly
              variant="light"
              radius="full"
              aria-label="Delete credit entry"
              onPress={() => creditRemove(index)}
              isDisabled={creditFields.length === 1}
            >
              <TrashIcon className="opacity-60 w-4 h-auto" aria-hidden />
            </Button>
          </Fragment>
        ))}
      </div>
      <Button
        disableRipple
        variant="light"
        onPress={() => creditAppend(emptyEntry)}
        startContent={
          <PlusIcon className="opacity-60 w-4 h-auto" aria-hidden />
        }
        className="my-4"
      >
        Add credits
      </Button>
      <div className="w-full mt-8 flex items-center gap-2">
        {transactionForm?.id && (
          <Button
            disableRipple
            variant="bordered"
            color="danger"
            startContent={
              <TrashIcon className="opacity-60 w-4 h-auto" aria-hidden />
            }
            onPress={() => onDelete(transactionForm.id!)}
          >
            Delete
          </Button>
        )}
        <Button
          className="ml-auto"
          as={Link}
          href="/transactions"
          variant="light"
          disableRipple
        >
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={isSubmitting}
          type="submit"
          disableRipple
        >
          Save
        </Button>
      </div>
      {errors.root && (
        <small
          role="alert"
          className="mt-8 text-red-500 flex items-center gap-2"
        >
          <XCircleIcon className="inline w-4 h-auto" aria-hidden />
          {errors.root.message}
        </small>
      )}
      {isSubmitSuccessful && (
        <small
          role="alert"
          className="mt-8 text-green-500 flex items-center gap-2"
        >
          <CheckCircleIcon className="inline w-4 h-auto" aria-hidden />
          Transaction saved!
        </small>
      )}
    </form>
  );
};

export default TransactionEditor;
