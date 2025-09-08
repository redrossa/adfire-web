import Link from 'next/link';
import Image from 'next/image';
import ProfileDropdown from '@/app/components/header/profile-dropdown';
import { auth } from '@/auth';
import { Button } from '@/app/components/ui/button';
import { ArrowLeftRightIcon, UserIcon } from 'lucide-react';

const links = [
  { text: 'Transactions', Icon: ArrowLeftRightIcon, href: '/transactions' },
  { text: 'Accounts', Icon: UserIcon, href: '/accounts' },
];

const Header = async () => {
  const session = await auth();
  if (!session) {
    return null;
  }

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
        <div className="flex items-center">
          <div className="hidden md:block">
            {links.map(({ text, href }) => (
              <Button key={text} asChild variant="link" size="sm">
                <Link href={href}>{text}</Link>
              </Button>
            ))}
          </div>
          <div className="ml-4">
            <ProfileDropdown />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
