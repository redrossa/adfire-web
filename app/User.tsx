import { auth } from '@/auth';

interface Props {
  user: string;
}

const User = async ({ user }: Props) => {
  const session = await auth();
  return (
      <p>{!session ? 'Signed out' : `Signed in as ${session.user?.name}`}. Showing user page for {user}</p>
  );
};

export default User;