'use client';

import { CheckCircleIcon, PlusIcon, TrashIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { IconButton, SolidButton, TextButton, TextField } from '@/components/forms';
import { useRouter } from 'next/navigation';

interface UserInput {
  name: string;
  mask: string;
}

interface AccountInput {
  name: string;
  users: UserInput[];
}

const emptyUser: UserInput = {
  name: '',
  mask: ''
};

const AccountEditor = () => {
  const router = useRouter();

  const { register, control, handleSubmit, setError, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<AccountInput>({
    defaultValues: {
      users: [emptyUser]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users'
  });

  const onSubmit: SubmitHandler<AccountInput> = async (data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
      method: 'POST',
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

  return (
      <div className="container shadow-md p-16 bg-background">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
              label="Account Name"
              placeholder="Chase Freedom Unlimited"
              error={errors.name && 'Required'}
              {...register('name', { required: true })}
          />
          <div className="mt-8 border-t border-foreground pt-8 flex flex-col gap-8">
            {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <TextField
                      className="flex-1"
                      label="Cardholder Name"
                      placeholder="John Doe"
                      error={errors.users?.[index]?.name && 'Required'}
                      {...register(`users.${index}.name`, { required: true })}
                  />
                  <TextField
                      label="Mask"
                      placeholder="0000"
                      error={errors.users?.[index]?.mask && 'Required'}
                      {...register(`users.${index}.mask`, { required: true })}
                  />
                  <div>
                    <IconButton
                        className="mt-8"
                        disabled={fields.length === 1}
                        onClick={() => remove(index)}
                        Icon={TrashIcon}
                    />
                  </div>
                </div>
            ))}
          </div>
          <TextButton
              Icon={PlusIcon}
              className="mt-8"
              text="Add users"
              onClick={() => append(emptyUser)}
          />
          <div className="mt-8 flex justify-end align gap-2">
            <TextButton
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
          {errors.root && <small role="alert" className="text-red-500 flex items-center gap-2"><XCircleIcon className="inline-flex w-6 h-6"/>{errors.root.type}: {errors.root.message}</small>}
          {isSubmitSuccessful && <small role="alert" className="text-green-500 flex items-center gap-2"><CheckCircleIcon className="inline-flex w-6 h-6" />Account saved!</small>}
        </form>
      </div>
  );
};

export default AccountEditor;