import AccountEditor from '@/app/accounts/AccountEditor';
import { getAccount } from '@/lib/services';

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function EditAccountPage({ params }: Props) {
  const { id } = await params;
  const account = await getAccount(id);
  return <AccountEditor account={account} />;
}
