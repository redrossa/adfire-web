'use client';

import {
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {
  Control,
  Controller,
  SubmitHandler,
  useController,
  UseControllerProps,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import {
  Account,
  AccountUser,
  Transaction,
  TransactionEntry,
} from '@/lib/models';
import { Fragment, useEffect, useState } from 'react';
import { getAccounts } from '@/lib/services';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from '@heroui/autocomplete';
import { cn } from '@/lib/utils';
import { DatePicker } from '@heroui/date-picker';
import { NumberInput } from '@heroui/number-input';
import { parseDate } from '@internationalized/date';
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from '@/lib/services/transactions';
import { useRouter } from 'next/navigation';

const emptyEntry: TransactionEntry = {
  accountUserId: '',
  date: '',
  amount: '' as any,
};

interface AccountOption {
  accountName: Account['name'];
  isMerchant: Account['isMerchant'];
  userName: AccountUser['name'];
  mask: AccountUser['mask'];
  id: AccountUser['id'];
  key: string;
}

interface Props {
  transaction?: Transaction;
}

const TransactionEditor = ({ transaction }: Props) => {
  const router = useRouter();
  const [accountOptions, setAccountOptions] = useState<AccountOption[]>([]);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Transaction>({
    defaultValues: !transaction
      ? {
          debits: [emptyEntry],
          credits: [emptyEntry],
        }
      : {
          ...transaction,
        },
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

  const onSubmit: SubmitHandler<Transaction> = async (data) => {
    const isNew = !transaction?.id;
    const service = isNew ? createTransaction : updateTransaction;

    try {
      await service(data);
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

  useEffect(() => {
    getAccounts(true).then((accounts) => {
      setAccountOptions(
        accounts.flatMap((a) =>
          a.users.map((u) => ({
            accountName: a.name,
            isMerchant: a.isMerchant,
            mask: u.mask,
            userName: u.name,
            id: u.id,
            key: !a.isMerchant ? `${a.name}#${u.mask}` : a.name,
          })),
        ),
      );
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        variant="faded"
        label="Transaction Name"
        labelPlacement="outside"
        placeholder="Groceries"
        classNames={{
          label: 'h6',
          input: `p`,
        }}
        isInvalid={!!errors.name}
        color={!!errors.name ? 'danger' : 'default'}
        errorMessage={errors.name?.message}
        {...register('name', { required: 'Name is required' })}
      />
      <div className="mt-8 flex items-center gap-4">
        <h6>From</h6>
        <hr className="flex-1 border-foreground" />
      </div>
      <div className="mt-8 grid grid-cols-[3fr_1fr_1fr_auto] gap-y-2 gap-x-4">
        <h6
          className={cn({
            'text-danger': errors.debits?.some?.((u) => u?.accountUserId),
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
              name={`debits.${index}.accountUserId`}
              rules={{ required: 'Account is required' }}
              errorMessage={errors?.debits?.[index]?.accountUserId?.message}
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
            'text-danger': errors.credits?.some?.((u) => u?.accountUserId),
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
              name={`credits.${index}.accountUserId`}
              errorMessage={errors?.credits?.[index]?.accountUserId?.message}
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
        {transaction?.id && (
          <Button
            disableRipple
            variant="bordered"
            color="danger"
            startContent={
              <TrashIcon className="opacity-60 w-4 h-auto" aria-hidden />
            }
            onPress={() => onDelete(transaction.id!)}
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

interface AccountSelectorProps extends UseControllerProps<any> {
  options: AccountOption[];
  control: Control<any>;
  name: string;
  errorMessage?: string;
}

const AccountSelector = ({
  options,
  control,
  name,
  errorMessage,
}: AccountSelectorProps) => {
  const { field } = useController({
    control,
    name,
    rules: { required: 'Account is required' },
  });
  const grouped = Object.entries(
    Object.groupBy(options, (o) =>
      o.isMerchant ? 'Past Merchants' : 'Your Accounts',
    ),
  );
  return (
    <Autocomplete
      isClearable={false}
      aria-label="Account selector"
      allowsCustomValue
      variant="faded"
      defaultItems={grouped}
      placeholder="Select an account or enter a new merchant"
      onSelectionChange={field.onChange}
      onBlur={field.onBlur}
      selectedKey={field.value}
      errorMessage={errorMessage}
      isInvalid={!!errorMessage}
      inputProps={{
        classNames: { input: 'p' },
      }}
      selectorButtonProps={{
        disableRipple: true,
      }}
    >
      {([groupName, options]) => (
        <AutocompleteSection title={groupName} key={groupName}>
          {options.map((o) => (
            <AutocompleteItem key={o.id} textValue={o.key}>
              <div>
                <p>
                  {o.accountName}
                  {!o.isMerchant && (
                    <code className="opacity-60">#{o.mask}</code>
                  )}
                </p>
                {!o.isMerchant && (
                  <small className="opacity-60">{o.userName}</small>
                )}
              </div>
            </AutocompleteItem>
          ))}
        </AutocompleteSection>
      )}
    </Autocomplete>
  );
};

interface DateFieldProps extends UseControllerProps<any> {
  control: Control<any>;
  name: string;
  errorMessage?: string;
}

const DateField = ({ control, name, errorMessage }: DateFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: 'Date is required',
      }}
      render={({ field }) => (
        <DatePicker
          aria-label="Date picker"
          variant="faded"
          value={field.value ? parseDate(field.value) : null}
          onChange={(v) => {
            field.onChange(v?.toString());
          }}
          onBlur={field.onBlur}
          isInvalid={!!errorMessage}
          errorMessage={errorMessage}
          selectorButtonProps={{
            disableRipple: true,
          }}
        />
      )}
    />
  );
};

interface DollarFieldProps extends UseControllerProps<any> {
  control: Control<any>;
  name: string;
  errorMessage?: string;
}

const DollarField = ({ control, name, errorMessage }: DollarFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: 'Amount is required',
      }}
      render={({ field }) => (
        <NumberInput
          aria-label="Amount in USD"
          variant="faded"
          placeholder="USD"
          formatOptions={{
            style: 'currency',
            currency: 'USD',
          }}
          classNames={{
            inputWrapper: 'py-0 px-3 h-10',
          }}
          value={field.value || null}
          onValueChange={field.onChange}
          onBlur={field.onBlur}
          isInvalid={!!errorMessage}
          errorMessage={errorMessage}
        />
      )}
    />
  );
};

export default TransactionEditor;
