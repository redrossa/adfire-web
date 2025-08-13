import { http, HttpResponse } from 'msw';
import { accounts } from '@/app/lib/mocks/data/accounts';
import { transactions } from '@/app/lib/mocks/data/transactions';
import { identifyDate, toAccount } from '@/app/lib/selectors/transactions';
import { getBalance } from '@/app/lib/selectors/accounts';
import { sum, orderBy } from 'lodash';
import { Balance } from '@/app/lib/models/balances';

export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, () => {
    // return all accounts
    return HttpResponse.json(accounts);
  }),
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/accounts/:id`, ({ params }) => {
    // return an account by id
    const account = accounts.find((account) => account.id === params.id);
    if (!account) {
      throw HttpResponse.json(null, { status: 404 });
    }
    return HttpResponse.json(account);
  }),
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/:id/transactions`,
    ({ params }) => {
      // return all transactions of an account by id
      const account = accounts.find((account) => account.id === params.id);
      if (!account) {
        throw HttpResponse.json(null, { status: 404 });
      }
      const txs = transactions.filter((t) =>
        t.entries
          .map(toAccount)
          .map((a) => a.id)
          .includes(account.id),
      );
      const sorted = orderBy(txs, (t) => identifyDate(t, account), 'desc');
      return HttpResponse.json(sorted);
    },
  ),
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/accounts/:id/balances`,
    ({ params }) => {
      const account = accounts.find((account) => account.id === params.id);
      if (!account) {
        throw HttpResponse.json(null, { status: 404 });
      }
      const txs = transactions.filter((t) =>
        t.entries
          .map(toAccount)
          .map((a) => a.id)
          .includes(account.id),
      );
      const entries = txs
        .flatMap((t) => t.entries)
        .filter((e) => e.account.id === account.id);
      const groups = Object.groupBy(entries, (x) => x.date);
      const grouped = Object.entries(groups).map(
        ([date, entries]) =>
          ({
            date,
            amount: sum(
              entries?.map((e) =>
                getBalance(e.amount, e.isCredit, e.account.type),
              ),
            ),
          }) as Balance,
      );
      const sorted = orderBy(grouped, 'date', 'asc');
      let start = 0;
      const cumsum: Balance[] = sorted.map((e) => ({
        amount: (start += e.amount),
        date: e.date,
      }));
      return HttpResponse.json(cumsum);
    },
  ),
];
