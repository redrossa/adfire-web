import Image from 'next/image';
import Link from 'next/link';
import TextButton from '@/components/TextButton';
import { signOut } from '@/auth';


const Navbar = () => {
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
        >
          <TextButton type="submit">
            Sign Out
          </TextButton>
        </form>
      </nav>
  );
};

export default Navbar;