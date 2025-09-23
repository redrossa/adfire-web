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
  withLogo?: boolean;
  withType?: boolean;
}

export const AccountLink = ({
  account,
  withLogo = false,
  withType = false,
}: Props) => {
  const initials = getInitials(account.name, 1);
  const logo = account.domain ? getLogo(account.domain) : undefined;
  return (
    <Link href={`/accounts/${account.id}`}>
      <span className="items-baseline group inline-flex rounded-md gap-1 border-0 whitespace-nowrap">
        {withLogo && (
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
          {withType && (
            <span className="text-muted-foreground"> • {account.type}</span>
          )}
        </span>
      </span>
    </Link>
  );
};

interface AccountMultilinkProps {
  accounts: Account[];
  withLogo?: boolean;
  withType?: boolean;
}

export const AccountMultilink = ({
  accounts,
  withLogo = false,
  withType = false,
}: AccountMultilinkProps) => {
  if (accounts.length === 0) {
    return <>no accounts</>;
  } else if (accounts.length === 1) {
    return (
      <AccountLink
        account={accounts[0]}
        withLogo={withLogo}
        withType={withType}
      />
    );
  } else if (accounts.length === 2) {
    return (
      <>
        <AccountLink
          account={accounts[0]}
          withLogo={withLogo}
          withType={withType}
        />{' '}
        and{' '}
        <AccountLink
          account={accounts[1]}
          withLogo={withLogo}
          withType={withType}
        />
      </>
    );
  } else {
    return <>{accounts.length} accounts</>;
  }
};
