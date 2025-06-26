import { http, HttpResponse } from 'msw';
import { Account, Transaction } from '@/lib/models';

export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, () => {
    return HttpResponse.json<Transaction[]>([
      {
        id: 'salary',
        name: 'Salary',
        date: '2025-06-13',
        amount: 3661.09,
        entries: [
          {
            id: 'salary-debit-0',
            accountId: 'slb',
            date: '2025-06-13',
            amount: -4175,
          },
          {
            id: 'salary-credit-0',
            accountId: 'fedtax',
            date: '2025-06-13',
            amount: 513.91,
          },
          {
            id: 'salary-credit-1',
            accountId: '401k',
            date: '2025-06-13',
            amount: 417.5,
          },
          {
            id: 'salary-credit-2',
            accountId: 'hsa',
            date: '2025-06-13',
            amount: 142.3,
          },
          {
            id: 'salary-credit-3',
            accountId: 'platypus-checking',
            date: '2025-06-11',
            amount: 3101.29,
          },
        ],
      },
      {
        id: 'groceries',
        name: 'Groceries',
        date: '2025-01-31',
        amount: -100,
        entries: [
          {
            id: 'groceries-debit-0',
            accountId: 'platypus-checking',
            date: '2025-01-31',
            amount: -100,
          },
          {
            id: 'groceries-credit-0',
            accountId: 'heb',
            date: '2025-02-01',
            amount: 100,
          },
        ],
      },
    ]);
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions/salary`, () => {
    return HttpResponse.json<Transaction>({
      id: 'salary',
      name: 'Salary',
      date: '2025-06-13',
      amount: 3661.09,
      entries: [
        {
          id: 'salary-debit-0',
          accountId: 'slb',
          date: '2025-06-13',
          amount: -4175,
        },
        {
          id: 'salary-credit-0',
          accountId: 'fedtax',
          date: '2025-06-13',
          amount: 513.91,
        },
        {
          id: 'salary-credit-1',
          accountId: '401k',
          date: '2025-06-13',
          amount: 417.5,
        },
        {
          id: 'salary-credit-2',
          accountId: 'hsa',
          date: '2025-06-13',
          amount: 142.3,
        },
        {
          id: 'salary-credit-3',
          accountId: 'platypus-checking',
          date: '2025-06-11',
          amount: 3101.29,
        },
      ],
    });
  }),
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/salary/accounts`,
    () => {
      return HttpResponse.json<Account[]>([
        {
          id: 'slb',
          name: 'SLB',
          isMerchant: true,
          amount: 0,
          holderName: '',
          mask: '',
        },
        {
          id: 'fedtax',
          name: 'Federal Tax',
          isMerchant: true,
          amount: 0,
          holderName: '',
          mask: '',
        },
        {
          id: '401k',
          name: 'SLB Alight 401k',
          isMerchant: false,
          amount: 0,
          holderName: '',
          mask: '',
        },
        {
          id: 'hsa',
          name: 'SLB Alight HSA',
          isMerchant: false,
          amount: 0,
          holderName: '',
          mask: '',
        },
        {
          id: 'platypus-checking',
          name: 'Platypus Checking',
          isMerchant: false,
          amount: 0,
          holderName: '',
          mask: '',
        },
      ]);
    },
  ),
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions/groceries`, () => {
    return HttpResponse.json<Transaction>({
      id: 'groceries',
      name: 'Groceries',
      date: '2025-01-31',
      amount: -100,
      entries: [
        {
          id: 'groceries-debit-0',
          accountId: 'platypus-checking',
          date: '2025-01-31',
          amount: -100,
        },
        {
          id: 'groceries-credit-0',
          accountId: 'heb',
          date: '2025-02-01',
          amount: 100,
        },
      ],
    });
  }),
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/groceries/accounts`,
    () => {
      return HttpResponse.json<Account[]>([
        {
          id: 'heb',
          name: 'HEB',
          isMerchant: true,
          amount: 0,
          holderName: '',
          mask: '',
        },
        {
          id: 'platypus-checking',
          name: 'Platypus Checking',
          isMerchant: false,
          amount: 0,
          holderName: '',
          mask: '',
        },
      ]);
    },
  ),
];
