'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Button } from '@heroui/button';
import { Avatar } from '@heroui/avatar';
import { getInitials } from '@/app/lib/utils';
import { User } from '@heroui/user';
import NextLink from 'next/link';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useIsMobile } from '@/app/lib/hooks/useIsMobile';
import { ForwardRefExoticComponent } from 'react';

interface NavLink {
  Icon: ForwardRefExoticComponent<any>;
  text: string;
  href: string;
}

const navLinks: NavLink[] = [
  // { Icon: ArrowsRightLeftIcon, text: 'Transactions', href: '/transactions' },
  // { Icon: BuildingLibraryIcon, text: 'Accounts', href: '/accounts' },
];

const ProfileDropdown = () => {
  const { data: session, status } = useSession();
  const isMobile = useIsMobile();

  if (status !== 'authenticated') {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ redirect: true, redirectTo: '/' });
  };

  return (
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
            name={getInitials(session.user?.name ?? '')}
            src={session.user?.image as string}
            alt={session.user?.name as string}
          ></Avatar>
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="profile" textValue="profile" showDivider isReadOnly>
          <User
            avatarProps={{
              className: 'hidden',
            }}
            name={session.user?.name}
            description={session.user?.email}
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
                  <link.Icon className="opacity-60 w-4 h-auto" aria-hidden />
                }
              >
                {link.text}
              </DropdownItem>
            ))}
          </>
        )}
        <DropdownItem
          key="signout"
          className="text-danger"
          color="danger"
          onClick={handleSignOut}
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
  );
};

export default ProfileDropdown;
