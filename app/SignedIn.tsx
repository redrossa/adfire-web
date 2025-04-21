import { auth } from '@/auth';
import Navbar from '@/app/Navbar';

const SignedIn = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }

  return (
      <div>
        <Navbar />
        <main className="flex flex-col m-auto max-w-[96rem] min-w-[64rem]">
          <p>{JSON.stringify(session)}</p>
        </main>
      </div>
  );
};

export default SignedIn;