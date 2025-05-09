import AccountEditor from '@/app/accounts/AccountEditor';
import { Account } from '@/models';
import { cookies } from 'next/headers';

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>
}

async function getAccount(id: string): Promise<Account> {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookieStore.toString()
    }
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return (await res.json()) satisfies Account;
}

export default async function EditAccountPage({ params }: Props) {
  const { id } = await params;
  const account = await getAccount(id);
  return <AccountEditor account={account} />;
}