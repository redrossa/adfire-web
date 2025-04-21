import Landing from '@/app/Landing';
import { auth } from '@/auth';
import User from '@/app/User';

export default async function RootPage() {
  const session = await auth();
  return !session?.user?.name ? <Landing /> : <User user={session.user.name} />;
}
