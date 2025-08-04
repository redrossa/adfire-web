'use client';

import { getInitials } from '@/app/lib/utils';
import { signOut, useSession } from 'next-auth/react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';

const ProfileDropdown = () => {
  const { data: session, status } = useSession();

  if (status !== 'authenticated') {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ redirect: true, redirectTo: '/' });
  };

  const imgSrc = session?.user?.image;
  const name = session?.user?.name;
  const email = session?.user?.email;
  const initials = getInitials(session?.user?.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage src={imgSrc} alt={name} />
          <AvatarFallback className="rounded-full">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg px-0"
        align="end"
      >
        <DropdownMenuLabel className="p-1 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src={imgSrc} alt={name} />
              <AvatarFallback className="rounded-full">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={handleSignOut}
          className="rounded-none cursor-pointer"
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
