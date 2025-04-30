import { auth } from '@/auth';
import Image from 'next/image';

const Dashboard = async () => {
  const session = await auth();
  console.log(session);
  return (
      <div className="container shadow-md p-16 flex items-center gap-16">
        <Image
            src={session?.user?.image as string}
            alt={session?.user?.name as string}
            width={128}
            height={128}
            className="rounded-full"
        />
        <div>
          <h3>{session?.user?.name}</h3>
          <p>{session?.user?.email}</p>
        </div>
      </div>
  );
};

export default Dashboard;