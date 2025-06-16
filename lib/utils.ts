import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

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
  signDisplay: 'always',
});
