import { Account, Transaction } from '@/lib/models';
import { http, HttpResponse } from 'msw';
import { TimeSeriesPoint } from '@/lib/models/balance';

export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, () => {
    return HttpResponse.json<Account[]>([
      {
        id: 'platypus-checking',
        name: 'Platypus Checking',
        isMerchant: false,
        amount: 2500,
        holderName: 'Redrossa',
        mask: '0000',
      },
      {
        id: 'platypus-credit',
        name: 'Platypus Credit',
        isMerchant: false,
        amount: -600,
        holderName: 'Redrossa',
        mask: '9999',
      },
    ]);
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/accounts/:id`, () => {
    return HttpResponse.json<Account>({
      id: 'platypus-checking',
      name: 'Platypus Checking',
      isMerchant: false,
      amount: 2500,
      holderName: 'Redrossa',
      mask: '0000',
    });
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/accounts/:id/balance`, () => {
    return HttpResponse.json<TimeSeriesPoint[]>([
      {
        date: '2025-01-31',
        amount: 1000,
      },
      {
        date: '2025-02-28',
        amount: 1400,
      },
      {
        date: '2025-03-31',
        amount: 2800,
      },
      {
        date: '2025-04-06',
        amount: 2200,
      },
      {
        date: '2025-04-30',
        amount: 3100,
      },
      {
        date: '2025-05-31',
        amount: 2500,
      },
    ]);
  }),
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/:id/transactions`,
    () => {
      return HttpResponse.json<Transaction[]>([
        {
          id: 'gift-2',
          name: 'Gift',
          date: '2025-05-31',
          amount: -600,
          entries: [],
        },
        {
          id: 'rsu',
          name: 'RSU',
          date: '2025-04-30',
          amount: 900,
          entries: [],
        },
        {
          id: 'stuff',
          name: 'Gift',
          date: '2025-04-06',
          amount: -600,
          entries: [],
        },
        {
          id: 'salary-march',
          name: 'Salary',
          date: '2025-03-31',
          amount: 1400,
          entries: [],
        },
        {
          id: 'salary-feb',
          name: 'Salary',
          date: '2025-02-28',
          amount: 400,
          entries: [],
        },
        {
          id: 'groceries',
          name: 'Groceries',
          date: '2025-01-31',
          amount: -100,
          entries: [
            {
              id: 'groceries-debit-0',
              accountUserId: '0000',
              date: '2025-01-31',
              amount: -100,
            },
            {
              id: 'groceries-credit-0',
              accountUserId: 'heb#merchant',
              date: '2025-02-01',
              amount: 100,
            },
          ],
        },
      ]);
    },
  ),
  http.post(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts`,
    async ({ request }) => {
      const account = await request.clone().json();
      account.id = 'fake-id';
      return HttpResponse.json<Account>(account);
    },
  ),
  http.put(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/:id`,
    async ({ request, params }) => {
      const { id } = params;
      const account = await request.clone().json();
      account.id = id;
      return HttpResponse.json<Account>(account);
    },
  ),
];
