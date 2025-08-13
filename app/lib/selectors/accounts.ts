import { AccountType } from '../models/accounts';

export function getInitials(name: string, firstCharOnly?: boolean) {
  const words = name.split(' ');
  let initials = '';

  for (const word of words) {
    if (word.length > 0) {
      initials += word.charAt(0).toUpperCase();
    }
  }
  return firstCharOnly && initials.length ? initials[0] : initials;
}

export function getLogo(domain: string, size: number = 128): string {
  return (
    domain &&
    `${process.env.NEXT_PUBLIC_LOGO_DEV_URL}/${domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&size=${size}&retina=true`
  );
}

export function getBalance(
  amount: number,
  isCredit: boolean,
  accountType?: AccountType,
) {
  switch (accountType) {
    case 'liability':
    case 'income':
      return isCredit ? amount : -amount;
    case 'asset':
    case 'expense':
    default:
      return isCredit ? -amount : amount;
  }
}

export function getEquity(
  amount: number,
  isCredit: boolean,
  accountType?: AccountType,
) {
  switch (accountType) {
    case 'income':
    case 'expense':
      return isCredit ? amount : -amount;
    case 'liability':
    case 'asset':
    default:
      return isCredit ? -amount : amount;
  }
}
