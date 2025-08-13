import { z } from 'zod';
import { accountTypes } from '@/app/lib/models/accounts';

export const accountFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  logo: z.string().optional(),
  type: z.enum(accountTypes),
});

export type AccountForm = z.infer<typeof accountFormSchema>;
