'use client';

import { Input } from '@/app/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  AutocompleteField,
  DateField,
  DollarField,
} from '@/app/components/inputs';
import { AccountLink } from '@/app/components/accounts/links';
import { Button } from '@/app/components/ui/button';
import { Account } from '@/app/lib/sdk';

const formSchema = z.object({
  name: z.string('Required').min(2, 'Too short'),
  amount: z.number('Required').gt(0, 'Must be greater than $0'),
  date: z.coerce.date<string>('Required'),
  payerId: z.string('Required').min(1, 'Required'),
  payeeId: z.string('Required').min(1, 'Required'),
});

type SchemaInput = z.input<typeof formSchema>; // This will allow string for 'age'
type SchemaOutput = z.output<typeof formSchema>;

interface Props {
  accounts: Account[];
}

export const TransactionEditForm = ({ accounts }: Props) => {
  const form = useForm<SchemaInput, any, SchemaOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: 0,
      date: '',
      payerId: '',
      payeeId: '',
    },
  });

  async function onSubmit(values: SchemaOutput) {
    const body = {
      id: crypto.randomUUID(),
      name: values.name,
      type: 'expense',
      entries: [
        {
          amount: values.amount,
          isCredit: true,
          account: accounts.find((a) => a.id === values.payerId),
        },
        {
          amount: values.amount,
          isCredit: false,
          account: accounts.find((a) => a.id === values.payeeId),
        },
      ],
    } as Transaction;
    const result = await createTransaction(body);
    console.log(result);
  }

  const options = accounts.map((a) => ({
    render: <AccountLink account={a} />,
    value: a.id,
    label: a.name,
  }));

  // useEffect(() => {
  //   const f = async () => {
  //     if (process.env.NODE_ENV === 'development') {
  //       // Dynamically import only in the browser
  //       const { worker } = await import('@/app/lib/mocks/handlers/browser');
  //       await worker.start({ onUnhandledRequest: 'bypass' });
  //     }
  //   };
  //
  //   f();
  // }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-lg w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Groceries" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <DollarField placeholder="$0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DateField placeholder="Select transaction date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payer</FormLabel>
              <FormControl>
                <AutocompleteField
                  placeholder="Select payer account"
                  options={options}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payee</FormLabel>
              <FormControl>
                <AutocompleteField
                  placeholder="Select payee account"
                  options={options}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          tabIndex={0}
          type="submit"
          className="mt-8 ml-auto md:ml-0 block"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};
