import { Account } from '@/lib/models';

export interface AccountOption {
  text: string;
  isNew: boolean;
  isMerchant: boolean;
  accountName: string;
  userName: string;
  userMask: string;
  userId: string | null;
}

export const mapToAccountOptions = (account: Account): AccountOption[] => {
  return account.users.map((user) => ({
    text: !account.isMerchant
      ? `${account.name}#${user.mask}`
      : `${account.name}`,
    isNew: false,
    isMerchant: account.isMerchant,
    accountName: account.name,
    userName: user.name,
    userMask: user.mask,
    userId: user.id ?? null,
  }));
};
