import Landing from '@/app/Landing';
import { auth } from '@/auth';
import Dashboard from '@/app/Dashboard';

export default async function RootPage() {
  const session = await auth();
  return !session?.user?.name ? <Landing /> : <Dashboard />;
}
