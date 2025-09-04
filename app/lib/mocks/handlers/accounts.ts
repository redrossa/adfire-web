import { http, HttpResponse } from 'msw';
import { mockDB } from '@/app/lib/mocks';
import { Account, AccountInput, Id, Order, Transaction } from '@/app/lib/sdk';
import { orderBy, sortBy } from 'lodash';

export const handlers = [
  http.get<never, never, Account[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts`,
    ({ request }) => {
      const url = new URL(request.url);
      const order = (url.searchParams.get('order') ?? 'asc') as Order;
      return HttpResponse.json(
        sortBy([...mockDB.accountIdMap.values()], 'name', order),
      );
    },
  ),
  http.post<never, AccountInput, Account>(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts`,
    async ({ request }) => {
      const input = await request.json();
      const account = { ...input, id: crypto.randomUUID() };
      mockDB.accountIdMap.set(account.id, account);
      return HttpResponse.json(account);
    },
  ),
  http.get<{ id: Id }, never, Account>(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/:id`,
    ({ params }) => {
      const account = mockDB.accountIdMap.get(params.id);
      if (!account) {
        throw HttpResponse.json(null, { status: 404 });
      }
      return HttpResponse.json(account);
    },
  ),
  http.put<{ id: Id }, AccountInput, Account>(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/:id`,
    async ({ params, request }) => {
      const account = mockDB.accountIdMap.get(params.id);
      if (!account) {
        throw HttpResponse.json(null, { status: 404 });
      }
      const input = await request.json();
      const replaced = { ...account, ...input };
      mockDB.accountIdMap.set(params.id, replaced);
      return HttpResponse.json(replaced);
    },
  ),
  http.delete<{ id: Id }>(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/:id`,
    ({ params }) => {
      const account = mockDB.accountIdMap.get(params.id);
      if (!account) {
        throw HttpResponse.json(null, { status: 404 });
      }
      mockDB.accountIdMap.delete(params.id);
      mockDB.transactionIdMap.delete(params.id);
    },
  ),
  http.get<{ id: Id }, never, Transaction[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/:id/transactions`,
    ({ params, request }) => {
      const account = mockDB.accountIdMap.get(params.id);
      if (!account) {
        throw HttpResponse.json(null, { status: 404 });
      }
      const url = new URL(request.url);
      const order = (url.searchParams.get('order') ?? 'asc') as Order;
      return HttpResponse.json(
        orderBy(mockDB.accountIdTransactionsMap.get(params.id), 'date', order),
      );
    },
  ),
];
