'use client';

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
import { LogOut, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { getInitials } from '@/app/lib/selectors/accounts';

const ProfileDropdown = () => {
  const { data: session, status } = useSession();
  const { resolvedTheme, setTheme } = useTheme();

  if (status !== 'authenticated') {
    return null;
  }

  const handleTheme = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, redirectTo: '/' });
  };

  const imgSrc = session?.user?.image ?? undefined;
  const name = session?.user?.name ?? '';
  const email = session?.user?.email;
  const initials = getInitials(name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar className="h-8 w-8 border">
          <AvatarImage src={imgSrc} alt={name} />
          <AvatarFallback className="font-light">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg px-0"
        align="end"
      >
        <DropdownMenuLabel className="p-1 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src={imgSrc} alt={name} />
              <AvatarFallback className="font-light">{initials}</AvatarFallback>
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
          className="rounded-none cursor-pointer"
          onClick={handleTheme}
        >
          {resolvedTheme === 'light' ? <MoonIcon /> : <SunIcon />}
          Switch theme
        </DropdownMenuItem>
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
