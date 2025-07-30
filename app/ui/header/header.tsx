import Link from 'next/link';
import Image from 'next/image';
import ProfileDropdown from '@/app/ui/header/profile-dropdown';

const Header = () => {
  return (
    <header className="relative">
      <nav className="mx-auto flex h-[72px] w-full items-center justify-between gap-3">
        <Link className="shrink-0" href="/" aria-label="Home" replace>
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
