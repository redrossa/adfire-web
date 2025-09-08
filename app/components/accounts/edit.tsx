'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Account,
  deleteAccountsById,
  postAccounts,
  putAccountsById,
} from '@/app/lib/sdk';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import { getInitials, getLogo } from '@/app/lib/utils/accounts';
import { zAccountInput, zAccountType } from '@/app/lib/sdk/zod.gen';
import { useRouter } from 'next/navigation';
import { cn } from '@/app/lib/utils';

interface Props {
  account?: Account;
  forwardPath?: string;
}

export function AccountForm({ account, forwardPath }: Readonly<Props>) {
  const router = useRouter();
  const form = useForm<z.infer<typeof zAccountInput>>({
    resolver: zodResolver(zAccountInput),
    defaultValues: {
      name: account?.name ?? '',
      type: account?.type ?? ('' as any),
      domain: account?.domain ?? '',
    },
  });

  const domain = form.watch('domain');
  const logo = domain ? getLogo(domain) : undefined; // explicitly set undefined because empty string ('') is faulty.
  const name = form.watch('name') ?? '';

  const onSubmit = async (values: z.infer<typeof zAccountInput>) => {
    const { error } = !account
      ? await postAccounts({
          credentials: 'include',
          body: values,
        })
      : await putAccountsById({
          credentials: 'include',
          path: { id: account.id },
          body: values,
        });

    if (error) {
      handleError(error);
    } else {
      routeForward();
    }
  };

  const handleDelete = async () => {
    if (!account) {
      return;
    }

    const { error } = await deleteAccountsById({
      credentials: 'include',
      path: { id: account.id },
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
        <Avatar className="size-16 border">
          <AvatarImage src={logo} alt={name} />
          <AvatarFallback>{getInitials(name, 2)}</AvatarFallback>
        </Avatar>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account name</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="Ex. Chase Freedom Unlimited"
                  type="text"
                  {...field}
                />
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
              <FormLabel>Account type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger className="text-base" tabIndex={0}>
                    <SelectValue placeholder="Select an account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {zAccountType.options.map((type) => (
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

        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution domain</FormLabel>
              <FormControl className="w-full">
                <Input placeholder="Ex. chase.com" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 justify-between">
          <div className="flex gap-4 order-last md:order-first ml-auto md:ml-0">
            <Button type="submit">{account ? 'Save' : 'Create'}</Button>
            <Button type="button" onClick={routeForward} variant="outline">
              Cancel
            </Button>
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            className={cn(!account ? 'hidden' : 'block')}
          >
            Delete
          </Button>
        </div>
        {!!form.formState.errors.root?.serverError && (
          <FormMessage>Something went wrong, please try again.</FormMessage>
        )}
      </form>
    </Form>
  );
}
