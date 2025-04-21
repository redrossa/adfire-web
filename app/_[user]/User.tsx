import { auth } from '@/auth';
import Image from 'next/image';
import Container from '@/components/Container';

interface Props {
  user: string;
}

const User = async ({}: Props) => {
  const session = await auth();

  return (
      <div className="flex flex-col">
        {/* For now, we only show signed-in user page, so we can use session to get user info. */}
        {session?.user && (
            <Container className="p-16 flex gap-16 items-center mb-16" float>
              <Image src={session.user?.image as string} alt="Profile" width={128} height={128}
                     className="rounded-full" />
              <div>
                <h2>{session.user?.name}</h2>
                <p>{session.user?.email}</p>
              </div>
            </Container>
        )}
      </div>
  );
};

export default User;