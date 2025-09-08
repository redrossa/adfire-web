import { z } from 'zod';
import { AccountType } from '@/app/lib/sdk';

export const accountFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  logo: z.string().optional(),
  type: z.enum(AccountType),
});

export type AccountForm = z.infer<typeof accountFormSchema>;
