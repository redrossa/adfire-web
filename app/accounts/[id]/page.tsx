import {
  fetchAccount,
  fetchAccountBalances,
  fetchAccountTransactions,
} from '@/app/lib/queries/accounts';
import AccountDetail from '@/app/components/accounts/detail';
import TransactionsListScroll from '@/app/components/transactions/list';
import BalanceChart from '@/app/components/balances/charts';
import { contextualize } from '@/app/lib/selectors/transactions';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AccountPage({ params }: Props) {
  const { id } = await params;
  const account = await fetchAccount(id);
  const transactions = await fetchAccountTransactions(account.id);
  const contexts = transactions.map((t) => contextualize(t, account));
  const balances = await fetchAccountBalances(account.id);
  return (
    <div className="flex flex-col gap-8">
      <AccountDetail account={account} />
      <BalanceChart balances={balances} />
      <TransactionsListScroll contexts={contexts} />
    </div>
  );
}
