import Link from 'next/link';
import Image from 'next/image';
import ProfileDropdown from '@/app/components/header/profile-dropdown';
import { auth } from '@/auth';

const Header = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }

  return (
    <header className="relative">
      <nav className="mx-auto flex h-[72px] w-full items-center justify-between gap-3">
        <Link className="shrink-0" href="/public" aria-label="Home" replace>
          <span className="sr-only">Adfire</span>
          <Image
            src="/adfire.svg"
            alt="Adfire Logo"
            priority={true}
            width={32}
            height={32}
            className="dark:invert"
          />
        </Link>
        <ProfileDropdown />
      </nav>
    </header>
  );
};

export default Header;
