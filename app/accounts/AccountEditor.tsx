'use client';

import Link from 'next/link';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Account, AccountUser } from '@/lib/models';
import { createAccount, deleteAccount, updateAccount } from '@/lib/services';
import { Fragment } from 'react';
import { Label } from '@/components/label';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import {
  CircleCheckIcon,
  CircleXIcon,
  PlusIcon,
  Trash2Icon,
} from 'lucide-react';

const emptyUser: AccountUser = {
  name: '',
  mask: '',
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
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Account>({
    defaultValues: !account
      ? {
          users: [emptyUser],
        }
      : {
          ...account,
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users',
  });

  const onSubmit: SubmitHandler<Account> = async (data) => {
    const isNew = !account?.id;
    const service = isNew ? createAccount : updateAccount;

    try {
      await service(data);
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
      <fieldset className="flex flex-col gap-2">
        <Label htmlFor="name">
          Account name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Chase Freedom Unlimited"
          className="peer"
          aria-invalid={!!errors.name}
          {...register('name', { required: 'Account name is required' })}
        />
        <small
          className="hidden peer-aria-invalid:block peer-aria-invalid:text-destructive"
          role="alert"
          aria-live="polite"
        >
          {errors.name?.message || errors.name?.type}
        </small>
      </fieldset>
      <div className="mt-8 border-t border-border pt-8 grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-2">
        <Label>
          Cardholder Name <span className="text-destructive">*</span>
        </Label>
        <Label className="col-span-2">
          Mask <span className="text-destructive">*</span>
        </Label>
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <fieldset>
              <Input
                id={`users.${index}.name`}
                placeholder="John Doe"
                className="peer"
                aria-invalid={!!errors.users?.[index]?.name}
                {...register(`users.${index}.name`, {
                  required: 'Cardholder name is required',
                })}
              />
              <p
                className="hidden peer-aria-invalid:block peer-aria-invalid:text-destructive mt-2 text-xs"
                role="alert"
                aria-live="polite"
              >
                {errors.users?.[index]?.name?.message ||
                  errors.users?.[index]?.name?.type}
              </p>
            </fieldset>
            <fieldset>
              <Input
                id={`users.${index}.mask`}
                placeholder="0000"
                className="peer"
                aria-invalid={!!errors.users?.[index]?.mask}
                {...register(`users.${index}.mask`, {
                  required: 'Mask is required',
                })}
              />
              <p
                className="hidden peer-aria-invalid:block peer-aria-invalid:text-destructive mt-2 text-xs"
                role="alert"
                aria-live="polite"
              >
                {errors.users?.[index]?.mask?.message ||
                  errors.users?.[index]?.mask?.type}
              </p>
            </fieldset>
            <Button
              type="button"
              className="rounded-full"
              variant="ghost"
              size="icon"
              aria-label={`Delete account user ${index}`}
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              <Trash2Icon className="opacity-60" size={16} aria-hidden="true" />
            </Button>
          </Fragment>
        ))}
      </div>
      <Button
        type="button"
        variant="ghost"
        className="mt-8"
        onClick={() => append(emptyUser)}
      >
        <PlusIcon className="opacity-60" size={16} />
        Add users
      </Button>
      <div className="mt-8 flex items-center gap-2">
        {account?.id && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => onDelete(account.id!)}
          >
            <Trash2Icon className="opacity-60" size={16} />
            Delete
          </Button>
        )}
        <Button type="button" asChild variant="ghost" className="ml-auto">
          <Link href="/accounts">Cancel</Link>
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Save
        </Button>
        <input type="submit" className="hidden" />
      </div>
      {errors.root && (
        <small
          className="hidden peer-aria-invalid:block peer-aria-invalid:text-destructive"
          role="alert"
          aria-live="polite"
        >
          <CircleXIcon className="inline-flex w-6 h-6" />
          {errors.root.message}
        </small>
      )}
      {isSubmitSuccessful && (
        <small
          className="hidden peer-aria-invalid:block peer-aria-invalid:text-destructive"
          role="alert"
          aria-live="polite"
        >
          <CircleCheckIcon className="inline-flex w-6 h-6" />
          Account saved!
        </small>
      )}
    </form>
  );
};

export default AccountEditor;
