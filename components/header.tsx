'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';
import Logo from '@/public/vercel.svg';
import { cn, getInitials } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import {
  ArrowLeftRightIcon,
  ChevronDownIcon,
  LandmarkIcon,
  LogOutIcon,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { ForwardRefExoticComponent } from 'react';

interface Link {
  Icon: ForwardRefExoticComponent<any>;
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'destructive';
}

const navLinks: Link[] = [
  { Icon: ArrowLeftRightIcon, text: 'Transactions', href: '/transactions' },
  { Icon: LandmarkIcon, text: 'Accounts', href: '/accounts' },
];

const dropdownLinks: Link[] = [
  {
    Icon: LogOutIcon,
    text: 'Sign out',
    onClick: signOut,
    variant: 'destructive',
  },
];

function Header() {
  const isMobile = useIsMobile();
  const session = useSession();

  return (
    <header className="before:bg-[linear-gradient(to_right,--theme(--color-border/.3),--theme(--color-border)_200px,--theme(--color-border)_calc(100%-200px),--theme(--color-border/.3))] relative before:absolute before:-inset-x-32 before:bottom-0 before:h-px">
      <div
        className="before:bg-ring/50 after:bg-ring/50 before:absolute before:-bottom-px before:-left-12 before:z-10 before:-ml-px before:size-[3px] after:absolute after:-right-12 after:-bottom-px after:z-10 after:-mr-px after:size-[3px]"
        aria-hidden="true"
      ></div>
      <nav className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-3">
        <Link className="shrink-0" href="/" aria-label="Home">
          <span className="sr-only">Adfire</span>
          <Image
            src={Logo}
            alt="Adfire Logo"
            width={24}
            height={24}
            priority={true}
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
                  <button className="flex items-center gap-2">
                    <Avatar>
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
                <DropdownMenuContent align="end" className="px-0 bg-background">
                  {(isMobile ? navLinks : [])
                    .concat(dropdownLinks)
                    .map((link) => (
                      <DropdownMenuItem
                        className="cursor-pointer outline-none focus:underline"
                        key={link.text}
                        asChild
                        variant={link.variant}
                      >
                        <HeaderLink
                          text={link.text}
                          href={link.href}
                          Icon={link.Icon}
                          onClick={link.onClick}
                        />
                      </DropdownMenuItem>
                    ))}
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
  onClick,
  className,
  ...props
}: {
  text: string;
  Icon?: ForwardRefExoticComponent<any>;
  href?: string;
  onClick?: () => void;
  className?: string;
  [key: string]: any;
}) {
  return href ? (
    <Link
      href={href || ''}
      className={cn(
        'flex items-center gap-0.5 text-sm hover:underline',
        className,
      )}
      {...props}
    >
      {Icon && <Icon size={16} aria-hidden />}
      <p>{text}</p>
    </Link>
  ) : (
    <div
      className={cn(
        'flex items-center gap-0.5 text-sm hover:underline',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon size={16} aria-hidden />}
      <p>{text}</p>
    </div>
  );
}

export { Header, HeaderLink };
