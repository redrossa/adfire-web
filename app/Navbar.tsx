import Image from 'next/image';
import Link from 'next/link';
import TextButton from '@/components/TextButton';
import { auth, signOut } from '@/auth';


const Navbar = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }

  return (
      <nav className="w-screen flex items-center justify-between px-12 py-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
              src="/vercel.svg"
              alt="Logo"
              width={16}
              height={16}
          />
          <h5>Adfire</h5>
        </Link>
        <form
            action={async () => {
              'use server';
              await signOut();
            }}
            className="flex items-center gap-8"
        >
          <TextButton type="submit">
            Sign Out
          </TextButton>
          <Image src={session.user?.image as string} alt={`${session.user?.name}'s Profile Picture`} width={32}
                 height={32} className="rounded-full" />
        </form>
      </nav>
  );
};

export default Navbar;