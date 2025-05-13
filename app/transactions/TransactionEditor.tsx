'use client';

import { CheckCircleIcon, PlusIcon, TrashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Combobox, ComboboxOption, IconButton, SolidButton, TextButton, TextField } from '@/components/forms';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Account, AccountUser, Transaction, TransactionEntry } from '@/models';
import { Fragment, useEffect, useState } from 'react';
import { getAccounts } from '@/services';

const emptyEntry: TransactionEntry = {
  accountUserId: '',
  date: '',
  amount: '' as any
};

interface Props {
  transaction?: Transaction;
}

interface AccountOption extends ComboboxOption {
  accountName: Account['name'];
  mask: AccountUser['mask'];
  userName: AccountUser['name'];
  id: AccountUser['id'];
}

const TransactionEditor = ({ transaction }: Props) => {
  const [accountOptions, setAccountOptions] = useState<AccountOption[]>([]);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<Transaction>({
    defaultValues: !transaction ? {
      debits: [emptyEntry],
      credits: [emptyEntry]
    } : {
      ...transaction
    }
  });

  const { fields: debitFields, append: debitAppend, remove: debitRemove } = useFieldArray({
    control,
    name: 'debits'
  });

  const { fields: creditFields, append: creditAppend, remove: creditRemove } = useFieldArray({
    control,
    name: 'credits'
  });

  const onSubmit: SubmitHandler<Transaction> = async data => {
    console.log(data);
  };

  const onDelete = async (id: string) => {
    console.log(`Deleting account ${id}`);
  };

  useEffect(() => {
    getAccounts(true).then(accounts => {
      setAccountOptions(accounts.flatMap(a => a.users.map(u => ({
        key: `${a.name}#${u.mask}`,
        accountName: a.name,
        mask: u.mask,
        userName: u.name,
        id: u.id
      }))));
    });
  }, []);

  return (
      <div className="container shadow-md p-16 bg-background">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
              label="Transaction Name"
              placeholder="Groceries"
              error={errors.name && 'Required'}
              {...register('name', { required: true })}
          />
          <div className="mt-8 flex items-center gap-4">
            <h6>From</h6>
            <hr className="flex-1 border-foreground" />
          </div>
          <div className="mt-8 grid grid-cols-[1fr_auto_auto_auto] gap-y-2 gap-x-4">
            <h6>Account</h6>
            <h6>Date</h6>
            <h6 className="col-span-2">Amount</h6>
            {debitFields.map((field, index) => (
                <Fragment key={index}>
                  <Controller
                      name={`debits.${index}.accountUserId`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange } }) => (
                          <Combobox
                              allowCustom
                              options={accountOptions}
                              placeholder="Account or Merchant"
                              error={errors.debits?.[index]?.accountUserId && 'Required'}
                              onChange={v => onChange(v?.id)}
                          >
                            {(option: AccountOption | string) => typeof option === 'string' ? (
                                <div>
                                  <p className="font-medium">&#34;{option}&#34;</p>
                                  <small className="text-gray-500">Merchant</small>
                                </div>
                            ) : (
                                <div>
                                  <p>{option.accountName}<code className="font-light">#{option.mask}</code></p>
                                  <small className="text-gray-500">{option.userName}</small>
                                </div>
                            )}
                          </Combobox>
                      )}
                  />
                  <TextField
                      placeholder="YYYY-MM-DD"
                      error={errors.debits?.[index]?.date && 'Required'}
                      {...register(`debits.${index}.date`, { required: true })}
                  />
                  <TextField
                      placeholder="USD"
                      type="number"
                      error={errors.debits?.[index]?.amount && 'Required'}
                      {...register(`debits.${index}.amount`, { required: true })}
                  />
                  <IconButton
                      disabled={debitFields.length === 1}
                      Icon={TrashIcon}
                      onClick={() => debitRemove(index)}
                  />
                </Fragment>
            ))}
          </div>
          <TextButton
              Icon={PlusIcon}
              className="mt-8"
              text="Add debits"
              onClick={() => debitAppend(emptyEntry)}
          />
          <div className="mt-8 flex items-center gap-4">
            <h6>To</h6>
            <hr className="flex-1 border-foreground" />
          </div>
          <div className="mt-8 grid grid-cols-[1fr_auto_auto_auto] gap-y-2 gap-x-4">
            <h6>Account</h6>
            <h6>Date</h6>
            <h6 className="col-span-2">Amount</h6>
            {creditFields.map((field, index) => (
                <Fragment key={index}>
                  <Controller
                      name={`credits.${index}.accountUserId`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange } }) => (
                          <Combobox
                              allowCustom
                              options={accountOptions}
                              placeholder="Account or Merchant"
                              error={errors.credits?.[index]?.accountUserId && 'Required'}
                              onChange={v => onChange(v?.id)}
                          >
                            {(option: AccountOption | string) => typeof option === 'string' ? (
                                <div>
                                  <p className="font-medium">&#34;{option}&#34;</p>
                                  <small className="text-gray-500">Merchant</small>
                                </div>
                            ) : (
                                <div>
                                  <p>{option.accountName}<code className="font-light">#{option.mask}</code></p>
                                  <small className="text-gray-500">{option.userName}</small>
                                </div>
                            )}
                          </Combobox>
                      )}
                  />
                  <TextField
                      placeholder="YYYY-MM-DD"
                      error={errors.credits?.[index]?.date && 'Required'}
                      {...register(`credits.${index}.date`, { required: true })}
                  />
                  <TextField
                      placeholder="USD"
                      type="number"
                      error={errors.credits?.[index]?.amount && 'Required'}
                      {...register(`credits.${index}.amount`, { required: true })}
                  />
                  <IconButton
                      disabled={creditFields.length === 1}
                      Icon={TrashIcon}
                      onClick={() => creditRemove(index)}
                  />
                </Fragment>
            ))}
          </div>
          <TextButton
              Icon={PlusIcon}
              className="mt-8"
              text="Add credits"
              onClick={() => creditAppend(emptyEntry)}
          />
          <div className="mt-8 flex items-center gap-2">
            {transaction && (
                <TextButton
                    role="alert"
                    Icon={TrashIcon}
                    text="Delete"
                    onClick={() => transaction?.id && onDelete(transaction.id)}
                />
            )}
            <TextButton
                className="ml-auto"
                text="Cancel"
                as={Link}
                href="/transactions"
            />
            <SolidButton
                disabled={isSubmitting}
                text="Save"
                type="submit"
            />
          </div>
          {errors.root && (
              <small role="alert" className="mt-8 text-red-500 flex items-center gap-2">
                <XCircleIcon className="inline-flex w-6 h-6" />{errors.root.message}
              </small>
          )}
          {isSubmitSuccessful && (
              <small role="alert" className="mt-8 text-green-500 flex items-center gap-2">
                <CheckCircleIcon className="inline-flex w-6 h-6" />Transaction saved!
              </small>
          )}
        </form>
      </div>
  );
};

export default TransactionEditor;