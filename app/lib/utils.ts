import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Entry } from '@/app/lib/models/transactions';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export { dayjs };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  const words = name.split(' ');
  let initials = '';

  for (const word of words) {
    if (word.length > 0) {
      initials += word.charAt(0).toUpperCase();
    }
  }
  return initials;
}

export const premiumDollarFormatter = Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

export const deltaDollarFormatter = Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  signDisplay: 'exceptZero',
});

export const isCredit = (e: Entry) => e.isCredit;
export const isDebit = (e: Entry) => !e.isCredit;
export const isMerchant = (e: Entry) => e.account.type === 'merchant';
export const isMine = (e: Entry) => e.account.type !== 'merchant';
