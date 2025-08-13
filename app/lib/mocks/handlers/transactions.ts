import { http, HttpResponse } from 'msw';
import { transactions } from '@/app/lib/mocks/data/transactions';
import { orderBy } from 'lodash';
import { identifyDate } from '@/app/lib/selectors/transactions';

export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, () => {
    // return all transactions
    const sorted = orderBy(transactions, (t) => identifyDate(t), 'desc');
    return HttpResponse.json(sorted);
  }),
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions/:id`,
    ({ params }) => {
      // return a transaction by id
      const transaction = transactions.find((t) => t.id === params.id);
      if (!transaction) {
        throw HttpResponse.json(null, { status: 404 });
      }
      return HttpResponse.json(transaction);
    },
  ),
];
