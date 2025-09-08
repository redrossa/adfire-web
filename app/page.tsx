import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { getInitials } from '@/app/lib/utils/accounts';
import {
  getAccounts,
  getTransactions,
  InternalAccountType,
} from '@/app/lib/sdk';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { TransactionList } from '@/app/components/transactions';
import { cookies } from 'next/headers';
import { AccountListGrouped } from '@/app/components/accounts';

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    notFound();
  }

  const cookieStore = await cookies();
  const { data: transactions = [] } = await getTransactions({
    headers: {
      Cookie: cookieStore.toString(),
    },
    query: {
      order: 'desc',
      limit: 3,
    },
  });
  const { data: accounts = [] } = await getAccounts({
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  const filtered = accounts?.filter((a) =>
    Object.values(InternalAccountType).includes(a.type as any),
  );

  const logo = session.user?.image ?? '';
  const name = session.user?.name ?? '';
  const email = session.user?.email ?? '';
  const initials = getInitials(name);
  return (
    <main className="space-y-8">
      <section className="flex items-center gap-6">
        <Avatar className="size-16 border">
          <AvatarImage src={logo} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg">{name}</h1>
          <p className="text-muted-foreground">{email}</p>
        </div>
      </section>
      {!!transactions?.length && (
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Most recent transactions</h2>
            <Button asChild size="sm">
              <Link href="/transactions/new">
                <PlusIcon /> <span className="hidden md:block">New</span>
              </Link>
            </Button>
          </div>
          <TransactionList transactions={transactions} showDate />
          <Button asChild size="sm" variant="link">
            <Link href="/transactions">View all</Link>
          </Button>
        </section>
      )}
      {!!filtered?.length && (
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Your accounts</h2>
            <Button asChild size="sm">
              <Link href="/transactions/new">
                <PlusIcon /> <span className="hidden md:block">New</span>
              </Link>
            </Button>
          </div>
          <AccountListGrouped accounts={filtered} />
          <Button asChild size="sm" variant="link">
            <Link href="/accounts">View all</Link>
          </Button>
        </section>
      )}
    </main>
  );
}
