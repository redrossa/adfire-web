import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import TransactionEditor from '@/app/transactions/TransactionEditor';
import { getTransaction } from '@/lib/services/transactions';

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function EditTransactionPage({ params }: Props) {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  const { id } = await params;
  const transaction = await getTransaction(id);
  return (
    <>
      <h3 className="mb-4">Edit Account</h3>
      <TransactionEditor transaction={transaction} />
    </>
  );
}
