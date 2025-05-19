import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  const session = await auth();
  if (!session) {
    redirect('/');
  }

  return <h3>Home</h3>;
};

export default Dashboard;
