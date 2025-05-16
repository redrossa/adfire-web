'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';
import Logo from '@/public/vercel.svg';
import LightLogo from '@/public/vercel-light.svg';
import { cn, getInitials } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import {
  ArrowLeftRightIcon,
  ChevronDownIcon,
  LandmarkIcon,
  LogOutIcon,
  SunMoonIcon,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { ForwardRefExoticComponent } from 'react';
import { useTheme } from 'next-themes';

interface NavLink {
  Icon: ForwardRefExoticComponent<any>;
  text: string;
  href: string;
}

const navLinks: NavLink[] = [
  { Icon: ArrowLeftRightIcon, text: 'Transactions', href: '/transactions' },
  { Icon: LandmarkIcon, text: 'Accounts', href: '/accounts' },
];

function Header() {
  const isMobile = useIsMobile();
  const session = useSession();
  const { theme, setTheme } = useTheme();

  const smartToggle = () => {
    /* The smart toggle by @nrjdalal */
    const prefersDarkScheme = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    if (theme === 'system') {
      setTheme(prefersDarkScheme ? 'light' : 'dark');
    } else if (
      (theme === 'light' && !prefersDarkScheme) ||
      (theme === 'dark' && prefersDarkScheme)
    ) {
      setTheme(theme === 'light' ? 'dark' : 'light');
    } else {
      setTheme('system');
    }
  };

  return (
    <header className="relative mb-14">
      <nav className="mx-auto flex h-[72px] w-full items-center justify-between gap-3">
        <Link className="shrink-0" href="/" aria-label="Home">
          <span className="sr-only">Adfire</span>
          <Image
            src={Logo}
            alt="Adfire Logo"
            width={24}
            height={24}
            priority={true}
            className="dark:hidden"
          />
          <Image
            src={LightLogo}
            alt="Adfire Logo"
            width={24}
            height={24}
            priority={true}
            className="hidden dark:block"
          />
        </Link>
        {session.status === 'authenticated' && (
          <div className="flex items-center">
            {!isMobile && (
              <>
                <div className="flex items-center gap-4 md:gap-10">
                  {navLinks.map(
                    (link) =>
                      link.href && (
                        <HeaderLink
                          key={link.text}
                          text={link.text}
                          href={link.href}
                        />
                      ),
                  )}
                </div>
                <div
                  className="bg-input ms-4 me-4 h-5 w-px md:ms-10"
                  aria-hidden="true"
                ></div>
              </>
            )}
            <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="select-none">
                      <AvatarImage
                        src={session.data.user?.image as string}
                        alt={session.data.user?.name as string}
                      />
                      {session.data.user?.name && (
                        <AvatarFallback>
                          {getInitials(session.data.user?.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    {!isMobile && (
                      <ChevronDownIcon
                        size={16}
                        className="opacity-60"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="px-0">
                  <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="text-foreground truncate text-sm font-medium">
                      {session.data.user?.name}
                    </span>
                    <small className="text-muted-foreground truncate text-xs font-normal">
                      {session.data.user?.email}
                    </small>
                  </DropdownMenuLabel>
                  {isMobile && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        {navLinks.map((link) => (
                          <DropdownMenuItem
                            key={link.href}
                            className="cursor-pointer outline-hidden focus:underline"
                            asChild
                          >
                            <HeaderLink
                              text={link.text}
                              href={link.href}
                              Icon={link.Icon}
                            />
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cursor-pointer outline-hidden focus:underline"
                      asChild
                    >
                      <div onClick={smartToggle}>
                        <SunMoonIcon
                          className="opacity-60"
                          size={16}
                          aria-hidden
                        />
                        <p>Switch themes</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer outline-hidden focus:underline"
                      asChild
                      variant="destructive"
                    >
                      <div onClick={() => signOut()}>
                        <LogOutIcon
                          className="opacity-60"
                          size={16}
                          aria-hidden
                        />
                        <p>Sign out</p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function HeaderLink({
  text,
  Icon,
  href,
  className,
  ...props
}: {
  text: string;
  Icon?: ForwardRefExoticComponent<any>;
  href: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-0.5 text-sm hover:underline',
        className,
      )}
      {...props}
    >
      {Icon && <Icon size={16} aria-hidden />}
      <p>{text}</p>
    </Link>
  );
}

export { Header, HeaderLink };
