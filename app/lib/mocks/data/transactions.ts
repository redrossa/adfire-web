import { Transaction } from '@/app/lib/models/transactions';
import { accountMap } from '@/app/lib/mocks/data/accounts';

// Stock Buy
// asset    -5571.95 USD
// asset    30 AAPL @ 185.4 USD
// expense  9.95 USD
//
// Stock Sell
// asset    -30 AAPL @ 185.4 USD (-5562 USD this is the price at bought)
// asset    5790.6 USD (sold at 193.02 USD)
// expense  9.95 USD
// income   218.65 USD
//
// Purchase with Credit Card Rewards
// liability  1000
// expense    1000
// expense    -30   (rewards count as rebate)
// asset      30

export const transactions: Transaction[] = [
  {
    id: 'iI2Kbpyp',
    name: 'Cash out',
    type: 'transfer',
    entries: [
      {
        date: '2025-07-23',
        amount: 100,
        isCredit: true,
        account: accountMap['Robinhood Individual'],
      },
      {
        date: '2025-07-25',
        amount: 1.75,
        isCredit: false,
        account: accountMap['Robinhood Fee'],
      },
      {
        date: '2025-07-25',
        amount: 98.25,
        isCredit: false,
        account: accountMap['Chase Total Checking'],
      },
    ],
  },
  {
    id: 'sTpWKqtA',
    name: 'Investments',
    type: 'transfer',
    entries: [
      {
        date: '2025-07-23',
        amount: 3000,
        isCredit: true,
        account: accountMap['Wealthfront Individual'],
      },
      {
        date: '2025-07-25',
        amount: 3000,
        isCredit: false,
        account: accountMap['Robinhood Individual'],
      },
    ],
  },
  {
    id: 'dLZVrAH2',
    name: 'Salary (Takehome)',
    type: 'income',
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
    id: '_q0pQ7kp',
    name: 'Merchandise',
    type: 'expense',
    entries: [
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
    id: 'hefQ5hYc',
    name: 'Merchandise',
    type: 'expense',
    entries: [
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
    id: '6OwUAr1O',
    name: 'Merchandise',
    type: 'expense',
    entries: [
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
    id: 'JbgBI73r',
    name: 'Merchandise',
    type: 'expense',
    entries: [
      {
        date: '2025-07-13',
        amount: 114.97,
        isCredit: false,
        account: accountMap['Amazon Balance'],
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
    id: 'P5CVPvR6',
    name: 'Merchandise',
    type: 'expense',
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
    ],
  },
  {
    id: '0pqwHRfC',
    name: 'Merchandise',
    type: 'expense',
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
    ],
  },
  {
    id: 'iCX44uLT',
    name: 'Groceries',
    type: 'expense',
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
    id: 'QpYJAyYZ',
    name: 'Merchandise',
    type: 'expense',
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
    ],
  },
  {
    id: 'XXGAlXn3',
    name: 'Merchandise',
    type: 'expense',
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
    ],
  },
  {
    id: 'QSlh6uXR',
    name: 'Salary',
    type: 'income',
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
        account: accountMap['Alight 401k'],
      },
      {
        date: '2025-07-11',
        amount: 142.3,
        isCredit: false,
        account: accountMap['Alight HSA'],
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
