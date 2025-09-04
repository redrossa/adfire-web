import { Account } from '@/app/lib/sdk';
import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import { getInitials, getLogo } from '@/app/lib/utils/accounts';

interface Props {
  account: Account;
  hideIcon?: boolean;
}

export const AccountLink = ({ account, hideIcon = false }: Props) => {
  const initials = getInitials(account.name, true);
  const logo = account.domain && getLogo(account.domain);
  return (
    <Link href={`/accounts/${account.id}`}>
      <span className="items-baseline group inline-flex rounded-md gap-1 border-0 whitespace-nowrap">
        {!hideIcon && (
          <span className="pl-0.5 self-center">
            <Avatar className="w-[1em] h-[1em] border">
              <AvatarImage src={logo} alt={account.name} />
              <AvatarFallback className="font-light text-[0.75em]">
                {initials}
              </AvatarFallback>
            </Avatar>
          </span>
        )}
        <span className="group-hover:underline underline-offset-4">
          {account.name}
        </span>
      </span>
    </Link>
  );
};

export const AccountMultilink = ({ accounts }: { accounts: Account[] }) => {
  if (accounts.length === 0) {
    return <>no accounts</>;
  } else if (accounts.length === 1) {
    return <AccountLink account={accounts[0]} />;
  } else if (accounts.length === 2) {
    return (
      <>
        <AccountLink account={accounts[0]} /> and{' '}
        <AccountLink account={accounts[1]} />
      </>
    );
  } else {
    return <>{accounts.length} accounts</>;
  }
};
