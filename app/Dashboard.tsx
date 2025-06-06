import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getBalance } from '@/lib/services/balance';
import Chart from '@/components/Chart';

const Dashboard = async () => {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  let balance;
  try {
    balance = await getBalance();
  } catch {
    balance = null;
  }

  return (
    <div className="flex flex-col">
      <h3>Net Worth</h3>
      <Chart data={balance?.balances ?? []} />
    </div>
  );
};

export default Dashboard;
