import { http, HttpResponse } from 'msw';
import { Entry, Id, Order, Transaction } from '@/app/lib/sdk';
import { mockDB } from '@/app/lib/mocks';
import { orderBy } from 'lodash';

export const handlers = [
  http.get<never, never, Transaction[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
    ({ request }) => {
      const url = new URL(request.url);
      const order = (url.searchParams.get('order') ?? 'asc') as Order;
      return HttpResponse.json(
        orderBy([...mockDB.transactionIdMap.values()], 'date', order),
      );
    },
  ),
  http.get<{ id: Id }, never, Transaction>(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/:id`,
    ({ params }) => {
      const transaction = mockDB.transactionIdMap.get(params.id);
      if (!transaction) {
        throw HttpResponse.json(null, { status: 404 });
      }
      return HttpResponse.json(transaction);
    },
  ),
  http.get<{ id: Id }, never, Entry[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/:id/entries`,
    ({ params, request }) => {
      const transaction = mockDB.transactionIdMap.get(params.id);
      if (!transaction) {
        throw HttpResponse.json(null, { status: 404 });
      }
      const url = new URL(request.url);
      const order = (url.searchParams.get('order') ?? 'asc') as Order;
      return HttpResponse.json(
        orderBy(mockDB.transactionIdEntriesMap.get(params.id), 'date', order),
      );
    },
  ),
];
