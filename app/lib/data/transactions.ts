import { Transaction } from '@/app/lib/models/transactions';
import { accountMap } from '@/app/lib/data/accounts';

export const transactions: Transaction[] = [
  {
    name: 'Salary (Takehome)',
    entries: [
      {
        date: '2025-07-23',
        amount: 3101.29,
        isCredit: false,
        account: accountMap['Capital One 360'],
      },
      {
        date: '2025-07-25',
        amount: 3101.29,
        isCredit: true,
        account: accountMap['SLB'],
      },
    ],
  },
  {
    name: 'Merchandise',
    entries: [
      {
        date: '2025-07-10',
        amount: 54.16,
        isCredit: true,
        account: accountMap['Prime Visa'],
      },
      {
        date: '2025-07-11',
        amount: 54.16,
        isCredit: false,
        account: accountMap['Amazon'],
      },
      {
        date: '2025-07-13',
        amount: 54.16,
        isCredit: false,
        account: accountMap['Prime Visa'],
      },
      {
        date: '2025-07-14',
        amount: 54.16,
        isCredit: true,
        account: accountMap['Amazon'],
      },
    ],
  },
  {
    name: 'Merchandise',
    entries: [
      {
        date: '2025-07-10',
        amount: 54.16,
        isCredit: true,
        account: accountMap['Amex Gold'],
      },
      {
        date: '2025-07-11',
        amount: 54.16,
        isCredit: false,
        account: accountMap['Amazon'],
      },
      {
        date: '2025-07-13',
        amount: 54.16,
        isCredit: false,
        account: accountMap['Prime Visa'],
      },
      {
        date: '2025-07-14',
        amount: 54.16,
        isCredit: true,
        account: accountMap['Amazon'],
      },
    ],
  },
  {
    name: 'Groceries',
    entries: [
      {
        date: '2025-07-10',
        amount: 64.32,
        isCredit: true,
        account: accountMap['Amex Gold'],
      },
      {
        date: '2025-07-10',
        amount: 64.32,
        isCredit: false,
        account: accountMap['HEB'],
      },
    ],
  },
  {
    name: 'Merchandise',
    entries: [
      {
        date: '2025-07-10',
        amount: 255.71,
        isCredit: true,
        account: accountMap['Prime Visa'],
      },
      {
        date: '2025-07-11',
        amount: 255.71,
        isCredit: false,
        account: accountMap['Amazon'],
      },
      {
        date: '2025-07-13',
        amount: 114.97,
        isCredit: false,
        account: accountMap['Prime Visa'],
      },
      {
        date: '2025-07-14',
        amount: 114.97,
        isCredit: true,
        account: accountMap['Amazon'],
      },
    ],
  },
  {
    name: 'Merchandise',
    entries: [
      {
        date: '2025-07-10',
        amount: 255.71,
        isCredit: true,
        account: accountMap['Prime Visa'],
      },
      {
        date: '2025-07-11',
        amount: 255.71,
        isCredit: false,
        account: accountMap['Amazon'],
      },
      {
        date: '2025-07-13',
        amount: 114.97,
        isCredit: false,
        account: accountMap['Amazon Credit'],
      },
      {
        date: '2025-07-14',
        amount: 114.97,
        isCredit: true,
        account: accountMap['Amazon'],
      },
    ],
  },
  {
    name: 'Groceries and medicines',
    entries: [
      {
        date: '2025-07-10',
        amount: 40.55,
        isCredit: true,
        account: accountMap['Amex Gold'],
      },
      {
        date: '2025-07-11',
        amount: 31.87,
        isCredit: false,
        account: accountMap['HEB'],
      },
      {
        date: '2025-07-11',
        amount: 8.68,
        isCredit: false,
        account: accountMap['HEB Pharmacy'],
      },
    ],
  },
  {
    name: 'Salary',
    entries: [
      {
        date: '2025-07-09',
        amount: 3101.29,
        isCredit: false,
        account: accountMap['Capital One 360'],
      },
      {
        date: '2025-07-11',
        amount: 4175,
        isCredit: true,
        account: accountMap['SLB'],
      },
      {
        date: '2025-07-11',
        amount: 462.21,
        isCredit: false,
        account: accountMap['Uncle Sam'],
      },
      {
        date: '2025-07-11',
        amount: 417.5,
        isCredit: false,
        account: accountMap['401k'],
      },
      {
        date: '2025-07-11',
        amount: 142.3,
        isCredit: false,
        account: accountMap['HSA'],
      },
      {
        date: '2025-07-11',
        amount: 42.46,
        isCredit: false,
        account: accountMap['Medical Insurance'],
      },
      {
        date: '2025-07-11',
        amount: 4.62,
        isCredit: false,
        account: accountMap['Dental Insurance'],
      },
      {
        date: '2025-07-11',
        amount: 4.62,
        isCredit: false,
        account: accountMap['Vision Insurance'],
      },
    ],
  },
  {
    name: 'Salary (including employer matching)',
    entries: [
      {
        date: '2025-07-09',
        amount: 3101.29,
        isCredit: false,
        account: accountMap['Capital One 360'],
      },
      {
        date: '2025-07-11',
        amount: 4175,
        isCredit: true,
        account: accountMap['SLB'],
      },
      {
        date: '2025-07-11',
        amount: 334,
        isCredit: true,
        account: accountMap['SLB 401k Matching'],
      },
      {
        date: '2025-07-11',
        amount: 462.21,
        isCredit: false,
        account: accountMap['Uncle Sam'],
      },
      {
        date: '2025-07-11',
        amount: 751.5,
        isCredit: false,
        account: accountMap['401k'],
      },
      {
        date: '2025-07-11',
        amount: 142.3,
        isCredit: false,
        account: accountMap['HSA'],
      },
      {
        date: '2025-07-11',
        amount: 42.46,
        isCredit: false,
        account: accountMap['Medical Insurance'],
      },
      {
        date: '2025-07-11',
        amount: 4.62,
        isCredit: false,
        account: accountMap['Dental Insurance'],
      },
      {
        date: '2025-07-11',
        amount: 4.62,
        isCredit: false,
        account: accountMap['Vision Insurance'],
      },
    ],
  },
];
