import { AccountForm } from '@/app/components/accounts/edit';
import { getAccountsById } from '@/app/lib/sdk';
import { cookies, headers } from 'next/headers';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AccountsEditPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const { data: account } = await getAccountsById({
    headers: {
      Cookie: cookieStore.toString(),
    },
    path: { id },
  });
  if (!account) {
    notFound();
  }

  const headersList = await headers();
  const referer = headersList.get('referer');
  const forwardPath = referer ? new URL(referer).pathname : undefined;

  return (
    <>
      <div className="flex justify-between items-center mb-4 min-h-8">
        <h1 className="text-lg md:text-xl font-bold">Edit account</h1>
      </div>
      <AccountForm account={account} forwardPath={forwardPath} />
    </>
  );
}
