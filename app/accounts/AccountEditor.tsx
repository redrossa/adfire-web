'use client';

import {
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createAccount, deleteAccount, updateAccount } from '@/lib/services';
import { Fragment } from 'react';
import { Input } from '@heroui/input';
import { Divider } from '@heroui/divider';
import { Button } from '@heroui/button';
import { cn } from '@/lib/utils';
import { Account } from '@/lib/models';
import DollarField from '@/components/DollarField';

const emptyUser: AccountUserForm = {
  name: '',
  mask: '',
};

interface AccountUserForm {
  id?: string;
  name: string;
  mask: string;
}

interface AccountForm {
  id?: string;
  name: string;
  amount: number;
  users: AccountUserForm[];
}

interface Props {
  account?: Account;
}

const AccountEditor = ({ account }: Props) => {
  const router = useRouter();

  const accountForm: AccountForm = !account
    ? {
        name: '',
        amount: 0,
        users: [emptyUser],
      }
    : {
        id: account.id,
        name: account.name,
        amount: 0,
        users: account.users.map((u) => ({
          id: u.id,
          name: u.name,
          mask: u.mask,
        })),
      };

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<AccountForm>({
    defaultValues: accountForm,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users',
  });

  const onSubmit: SubmitHandler<AccountForm> = async (form) => {
    const isNew = !account;

    try {
      if (isNew) {
        await createAccount({
          name: form.name,
          amount: form.amount,
          isMerchant: false,
          users: form.users.map((u) => ({
            name: u.name,
            mask: u.mask,
          })),
        });
      } else {
        await updateAccount({
          id: form.id,
          name: form.name,
          amount: form.amount,
          isMerchant: false,
          users: form.users.map((u) => ({
            id: u.id,
            name: u.name,
            mask: u.mask,
          })),
        });
      }
      router.push('/accounts');
    } catch (err) {
      setError('root', { message: (err as Error).message });
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteAccount(id);
      router.push('/accounts');
    } catch (err) {
      setError('root', { message: (err as Error).message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full grid grid-cols-[1fr_auto_auto] gap-x-4">
        <Input
          variant="faded"
          label="Account Name"
          labelPlacement="outside"
          placeholder="Chase Freedom Unlimited"
          classNames={{
            label: 'h6',
            input: `p`,
          }}
          isInvalid={!!errors.name}
          color={errors.name ? 'danger' : 'default'}
          errorMessage={errors.name?.message}
          defaultValue={accountForm.name}
          {...register('name', { required: 'Name is required' })}
        />
        <DollarField
          control={control}
          name={`amount`}
          label="Balance"
          errorMessage={errors?.amount?.message}
        />
        <div className="w-10" />
      </div>
      <Divider className="my-4" />
      <div className="w-full grid grid-cols-[1fr_auto_auto] gap-y-2 gap-x-4">
        <h6
          className={cn({
            'text-danger': errors.users?.some?.((u) => u?.name),
          })}
        >
          Cardholder Name
        </h6>
        <h6
          className={cn('col-span-2', {
            'text-danger': errors.users?.some?.((u) => u?.mask),
          })}
        >
          Mask
        </h6>
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <Input
              variant="faded"
              placeholder="John Doe"
              classNames={{
                input: 'p',
              }}
              isInvalid={!!errors.users?.[index]?.name}
              color={errors.users?.[index]?.name ? 'danger' : 'default'}
              errorMessage={errors.users?.[index]?.name?.message}
              defaultValue={field.name}
              {...register(`users.${index}.name` as const, {
                required: 'User name is required',
              })}
            />
            <Input
              variant="faded"
              placeholder="0000"
              classNames={{
                input: 'p',
              }}
              isInvalid={!!errors.users?.[index]?.mask}
              color={errors.users?.[index]?.mask ? 'danger' : 'default'}
              errorMessage={errors.users?.[index]?.mask?.message}
              defaultValue={field.mask}
              {...register(`users.${index}.mask` as const, {
                required: 'User mask is required',
              })}
            />
            <Button
              disableRipple
              isIconOnly
              variant="light"
              radius="full"
              aria-label="Delete user"
              onPress={() => remove(index)}
              isDisabled={fields.length === 1}
            >
              <TrashIcon className="opacity-60 w-4 h-auto" aria-hidden />
            </Button>
          </Fragment>
        ))}
      </div>
      <Button
        disableRipple
        variant="light"
        onPress={() => append(emptyUser)}
        startContent={
          <PlusIcon className="opacity-60 w-4 h-auto" aria-hidden />
        }
        className="my-4"
      >
        Add users
      </Button>
      <div className="w-full mt-8 flex items-center gap-2">
        {!account ? null : (
          <Button
            disableRipple
            variant="bordered"
            color="danger"
            startContent={
              <TrashIcon className="opacity-60 w-4 h-auto" aria-hidden />
            }
            onPress={() => onDelete(account.id)}
          >
            Delete
          </Button>
        )}
        <Button
          className="ml-auto"
          variant="light"
          disableRipple
          onPress={() => router.back()}
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
          Account saved!
        </small>
      )}
    </form>
  );
};

export default AccountEditor;
