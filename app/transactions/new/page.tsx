import TransactionEditor from '@/app/transactions/TransactionEditor';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function NewTransactionPage() {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  return (
    <>
      <h3 className="mb-8">Create a New Account</h3>
      <TransactionEditor />
    </>
  );
}
