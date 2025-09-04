'use client';

import {
  Calculator,
  Calendar,
  CreditCard,
  SearchIcon,
  Settings,
  Smile,
  User,
} from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { useIsMobile } from '@/app/hooks/use-mobile';
import { Button } from '@/app/components/ui/button';
import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  CommandSeparator,
} from '@/app/components/ui/command';

const Command = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      {!isMobile ? (
        <div className="relative">
          <SearchIcon className="size-4 absolute top-1/2 -translate-y-1/2 left-2" />
          <Input
            type="search"
            className="pl-8 focus-visible:ring-0 focus-visible:border-input"
            placeholder="Search"
            onClick={handleOpen}
          />
          <CommandShortcut className="absolute top-1/2 -translate-y-1/2 right-2">
            ⌘K
          </CommandShortcut>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={handleOpen}
        >
          <SearchIcon />
        </Button>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Command;
