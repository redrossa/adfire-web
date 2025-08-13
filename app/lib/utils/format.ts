import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export { dayjs };

export const premiumDollarFormatter = Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

export const deltaDollarFormatter = Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  signDisplay: 'exceptZero',
});
