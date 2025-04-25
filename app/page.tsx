import Landing from '@/app/Landing';
import { auth } from '@/auth';

export default async function RootPage() {
  const session = await auth();
  return !session?.user?.name ? <Landing /> : <p>Home</p>;
}
