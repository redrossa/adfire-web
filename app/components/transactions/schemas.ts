import { z } from 'zod';
import { accountFormSchema } from '@/app/components/accounts/schemas';
import { transactionTypes } from '@/app/lib/models/transactions';

export const entryFormSchema = z.object({
  account: accountFormSchema,
  amount: z.number(),
  date: z.date(),
});

export const transactionFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  type: z.enum(transactionTypes),
  from: z.array(entryFormSchema),
  to: z.array(entryFormSchema),
});

export type TransactionForm = z.infer<typeof transactionFormSchema>;
