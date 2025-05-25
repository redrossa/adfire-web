import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import TransactionEditor, {
  TransactionEntryForm,
} from '@/app/transactions/TransactionEditor';
import { getTransaction } from '@/lib/services/transactions';
import { TransactionEntry } from '@/lib/models';
import { getAccounts } from '@/lib/services';
import {
  AccountOption,
  mapToAccountOptions,
} from '@/components/AccountSelector/utils';

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>;
}

const mapEntry = (
  entry: TransactionEntry,
  accountOptions: AccountOption[],
): TransactionEntryForm => {
  return {
    id: entry.id,
    account:
      accountOptions.find((o) => o.userId === entry.accountUserId) ?? null,
    date: entry.date,
    amount: entry.amount,
  };
};

export default async function EditTransactionPage({ params }: Props) {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  const { id } = await params;
  const transaction = await getTransaction(id);
  const accounts = await getAccounts(true);
  const accountOptions = accounts.flatMap((a) => mapToAccountOptions(a));
  const transactionForm = {
    id: transaction.id,
    name: transaction.name,
    debits: transaction.debits.map((e) => mapEntry(e, accountOptions)),
    credits: transaction.credits.map((e) => mapEntry(e, accountOptions)),
  };

  return (
    <>
      <h3 className="mb-8">Edit Account</h3>
      <TransactionEditor transactionForm={transactionForm} />
    </>
  );
}
