'use client';

import NextLink from 'next/link';
import Image from 'next/image';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import Logo from '@/public/vercel.svg';
import LightLogo from '@/public/vercel-light.svg';
import { getInitials } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';
import { ForwardRefExoticComponent, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Avatar } from '@heroui/avatar';
import { Link } from '@heroui/link';
import { User } from '@heroui/user';
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowsRightLeftIcon,
  BuildingLibraryIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@heroui/button';

interface NavLink {
  Icon: ForwardRefExoticComponent<any>;
  text: string;
  href: string;
}

const navLinks: NavLink[] = [
  { Icon: ArrowsRightLeftIcon, text: 'Transactions', href: '/transactions' },
  { Icon: BuildingLibraryIcon, text: 'Accounts', href: '/accounts' },
];

const Headers = () => {
  const isMobile = useIsMobile();
  const session = useSession();
  const { theme, setTheme } = useTheme();
  const [prefersDarkScheme, setPrefersDarkScheme] = useState<boolean>();

  const smartToggle = () => {
    /* The smart toggle by @nrjdalal */
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

  useEffect(() => {
    setPrefersDarkScheme(
      window.matchMedia('(prefers-color-scheme: dark)').matches,
    );
  }, []);

  return (
    <header className="relative mb-14">
      <nav className="mx-auto flex h-[72px] w-full items-center justify-between gap-3">
        <NextLink className="shrink-0" href="/" aria-label="Home">
          <span className="sr-only">Adfire</span>
          <Image
            src={
              (theme === 'system' && prefersDarkScheme) || theme === 'dark'
                ? LightLogo
                : Logo
            }
            alt="Adfire Logo"
            priority={true}
            className="h-6 w-auto"
          />
        </NextLink>
        {session.status === 'authenticated' && (
          <div className="flex items-center gap-4 md:gap-10">
            {!isMobile &&
              navLinks.map(
                (link) =>
                  link.href && (
                    <Link
                      as={NextLink}
                      key={link.href}
                      href={link.href}
                      color="foreground"
                    >
                      {link.text}
                    </Link>
                  ),
              )}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="flex items-center gap-2"
                  variant="light"
                  isIconOnly
                  radius="full"
                  disableRipple
                >
                  <Avatar
                    showFallback
                    name={getInitials(session.data.user?.name ?? '')}
                    src={session.data.user?.image as string}
                    alt={session.data.user?.name as string}
                  ></Avatar>
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="profile"
                  textValue="profile"
                  showDivider
                  isReadOnly
                >
                  <User
                    avatarProps={{
                      className: 'hidden',
                    }}
                    name={session.data.user?.name}
                    description={session.data.user?.email}
                  />
                </DropdownItem>
                {!isMobile ? null : (
                  <>
                    {navLinks.map((link) => (
                      <DropdownItem
                        as={NextLink}
                        href={link.href}
                        key={link.href}
                        startContent={
                          <link.Icon
                            className="opacity-60 w-4 h-auto"
                            aria-hidden
                          />
                        }
                      >
                        {link.text}
                      </DropdownItem>
                    ))}
                  </>
                )}
                <DropdownItem
                  key="theme"
                  onClick={smartToggle}
                  startContent={
                    (theme === 'system' && prefersDarkScheme) ||
                    theme === 'dark' ? (
                      <SunIcon className="opacity-60 w-4 h-auto" aria-hidden />
                    ) : (
                      <MoonIcon className="opacity-60 w-4 h-auto" aria-hidden />
                    )
                  }
                >
                  Switch themes
                </DropdownItem>
                <DropdownItem
                  key="signout"
                  className="text-danger"
                  color="danger"
                  onClick={() => signOut()}
                  startContent={
                    <ArrowLeftStartOnRectangleIcon
                      className="opacity-60 w-4 h-auto"
                      aria-hidden
                    />
                  }
                >
                  Sign out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Headers;
