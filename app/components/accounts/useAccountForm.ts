'use client';

import { Account } from '@/app/lib/models/accounts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountForm } from './schemas';
import { accountFormSchema } from '@/app/components/accounts/schemas';

const useAccountForm = (account: Account) => {
  return useForm<AccountForm>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: account,
  });
};

export default useAccountForm;
