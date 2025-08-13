import {
  TransactionEntryList,
  TransactionHeading,
} from '@/app/components/transactions/detail';
import { fetchTransaction } from '@/app/lib/queries/transactions';
import { contextualize } from '@/app/lib/selectors/transactions';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function TransactionPage({ params }: Props) {
  const { id } = await params;
  const transaction = await fetchTransaction(id);
  console.log(transaction);
  const context = contextualize(transaction);
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xl">
        <TransactionHeading context={context} showDate />
      </span>
      <TransactionEntryList context={context} />
    </div>
  );
}
