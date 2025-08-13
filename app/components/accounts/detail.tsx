'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import { Account } from '@/app/lib/models/accounts';
import { getInitials, getLogo } from '@/app/lib/selectors/accounts';
import { AccountLink } from '@/app/components/accounts/links';

interface Props {
  account: Account;
}

const AccountDetail = ({ account }: Props) => {
  const initials = getInitials(account.name, true);
  const logo = account.domain && getLogo(account.domain);
  return (
    <div className="flex items-center gap-6">
      <Avatar className="size-16 border">
        <AvatarImage src={logo} alt={account.name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h1 className="font-bold text-lg">
          <AccountLink account={account} hideIcon />
        </h1>
        <p className="capitalize text-muted-foreground">{account.type}</p>
      </div>
    </div>
  );
};

export default AccountDetail;
