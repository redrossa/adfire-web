'use client';

import { CheckCircleIcon, PlusIcon, TrashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { IconButton, SolidButton, TextButton, TextField } from '@/components/forms';
import { useRouter } from 'next/navigation';
import { Account, AccountUser } from '@/models';

const emptyUser: AccountUser = {
  name: '',
  mask: ''
};

interface Props {
  account?: Account;
}

const AccountEditor = ({ account }: Props) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<Account>({
    defaultValues: !account ? {
      users: [emptyUser]
    } : {
      ...account
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users'
  });

  const onSubmit: SubmitHandler<Account> = async (data) => {
    const isNew = !account?.id;
    const url = isNew ? `${process.env.NEXT_PUBLIC_API_URL}/accounts`
        : `${process.env.NEXT_PUBLIC_API_URL}/accounts/${account.id}`;
    const res = await fetch(url, {
      method: isNew ? 'POST' : 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      setError('root', {
        type: res.status.toString(),
        message: res.statusText
      });
    } else {
      router.push('/accounts');
    }
  };

  const onDelete = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!res.ok) {
      setError('root', {
        type: res.status.toString(),
        message: res.statusText
      });
    } else {
      router.push('/accounts');
    }
  };

  return (
      <div className="container shadow-md p-16 bg-background">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
              label="Account Name"
              placeholder="Chase Freedom Unlimited"
              error={errors.name && 'Required'}
              {...register('name', { required: true })}
          />
          <div className="mt-8 border-t border-foreground pt-8 grid grid-cols-[1fr_auto_auto] gap-y-2 gap-x-4">
            <h6 className="">Cardholder Name</h6>
            <h6 className="col-span-2">Mask</h6>
            {fields.map((field, index) => (
                <>
                  <TextField
                      className="flex-1"
                      placeholder="John Doe"
                      error={errors.users?.[index]?.name && 'Required'}
                      {...register(`users.${index}.name`, { required: true })}
                  />
                  <TextField
                      placeholder="0000"
                      error={errors.users?.[index]?.mask && 'Required'}
                      {...register(`users.${index}.mask`, { required: true })}
                  />
                  <IconButton
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                      Icon={TrashIcon}
                  />
                </>
            ))}
          </div>
          <TextButton
              Icon={PlusIcon}
              className="mt-8"
              text="Add users"
              onClick={() => append(emptyUser)}
          />
          <div className="mt-8 flex gap-2">
            {account && (
                <TextButton
                    role="alert"
                    Icon={TrashIcon}
                    text="Delete"
                    onClick={() => account?.id && onDelete(account.id)}
                />
            )}
            <TextButton
                className="ml-auto"
                text="Cancel"
                as={Link}
                href="/accounts"
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
                <CheckCircleIcon className="inline-flex w-6 h-6" />Account saved!
              </small>
          )}
        </form>
      </div>
  );
};

export default AccountEditor;