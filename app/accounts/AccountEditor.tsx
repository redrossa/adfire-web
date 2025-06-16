'use client';

import {
  CheckCircleIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createAccount, deleteAccount, updateAccount } from '@/lib/services';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Account, AccountUpdate } from '@/lib/models';
import DollarField from '@/components/DollarField';

interface AccountForm {
  id?: string;
  name: string;
  amount: number;
  holderName: string;
  mask: string;
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
        holderName: '',
        mask: '',
      }
    : {
        id: account.id,
        name: account.name,
        amount: account.amount,
        holderName: account.holderName,
        mask: account.mask,
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

  const onSubmit: SubmitHandler<AccountForm> = async (form) => {
    const isNew = !account;
    const payload: AccountUpdate = {
      name: form.name,
      amount: form.amount,
      isMerchant: false,
      holderName: form.holderName,
      mask: form.mask,
    };

    try {
      if (isNew) {
        await createAccount(payload);
      } else {
        payload.id = form.id;
        await updateAccount(payload);
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
      <div className="w-full grid grid-cols-[1fr_auto] gap-x-4 gap-y-8">
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
        <Input
          variant="faded"
          label="Mask"
          labelPlacement="outside"
          placeholder="0000"
          classNames={{
            label: 'h6',
            input: 'p',
          }}
          isInvalid={!!errors.mask}
          color={errors.mask ? 'danger' : 'default'}
          errorMessage={errors.mask?.message}
          defaultValue={accountForm.mask}
          {...register('mask', {
            required: 'Mask is required',
          })}
        />
        <Input
          variant="faded"
          label="Cardholder Name"
          labelPlacement="outside"
          placeholder="John Doe"
          classNames={{
            label: 'h6',
            input: 'p',
          }}
          isInvalid={!!errors.holderName}
          color={errors.holderName ? 'danger' : 'default'}
          errorMessage={errors.holderName?.message}
          defaultValue={accountForm.holderName}
          {...register('holderName', {
            required: 'Cardholder name is required',
          })}
        />
        <DollarField
          control={control}
          name={`amount`}
          label="Balance"
          errorMessage={errors?.amount?.message}
        />
      </div>
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
