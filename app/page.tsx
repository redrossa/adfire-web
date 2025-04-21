import { auth } from '@/auth';
import SignedOut from '@/app/SignedOut';
import SignedIn from '@/app/SignedIn';

export default async function Home() {
  const session = await auth();

  return (
      <div className="flex flex-col items-center">
        {!session ? <SignedOut /> : <SignedIn />}
      </div>
  );
}
