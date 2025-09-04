'use client';

import { CalendarIcon, Check, ChevronsUpDown, PlusIcon } from 'lucide-react';
import * as React from 'react';
import { ReactNode, useState } from 'react';
import { cn } from '@/app/lib/utils';
import { Button } from '@/app/components/ui/button';
import { Calendar } from '@/app/components/ui/calendar';
import { dayjs } from '@/app/lib/utils/format';
import { useIsMobile } from '@/app/hooks/use-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/app/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/app/components/ui/command';
import {
  Group,
  Input as InputRac,
  NumberField,
  NumberFieldProps,
} from 'react-aria-components';

export const DollarField = ({
  className,
  placeholder,
  ...props
}: NumberFieldProps & React.ComponentProps<'input'>) => {
  return (
    <NumberField
      formatOptions={{
        style: 'currency',
        currency: 'USD',
      }}
      aria-label="Dollar Field"
      {...props}
    >
      <Group className={cn('relative', className)}>
        <InputRac
          placeholder={placeholder}
          className={cn(
            'peer file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            className,
          )}
          aria-invalid={props['aria-invalid']}
        />
        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
          USD
        </span>
      </Group>
    </NumberField>
  );
};

export const DateField = ({
  className,
  placeholder,
  value,
  onChange,
  ...props
}: Omit<React.ComponentProps<'input'>, 'size'> &
  React.ComponentProps<'button'>) => {
  const [date, setDate] = useState<Date | undefined>(
    !value ? undefined : new Date(value as string),
  );
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const Credenza = isMobile ? Drawer : Popover;
  const CredenzaTrigger = isMobile ? DrawerTrigger : PopoverTrigger;
  const CredenzaContent = isMobile ? DrawerContent : PopoverContent;

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date as any);
    setDate(date);
    setOpen(false);
  };

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>
        <Button
          tabIndex={0}
          variant="outline"
          className={cn(
            'group w-full justify-between px-3 font-normal text-base',
            className,
          )}
          size="default"
          {...props}
        >
          <span className={cn('truncate', !date && 'text-muted-foreground')}>
            {date ? dayjs(date).format('LL') : placeholder}
          </span>
          <CalendarIcon
            size={16}
            className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
            aria-hidden="true"
          />
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="w-auto h-[80vh] md:h-fit p-2" align="start">
        {!isMobile ? null : (
          <DrawerHeader>
            <DrawerTitle>{placeholder}</DrawerTitle>
          </DrawerHeader>
        )}
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </CredenzaContent>
    </Credenza>
  );
};

export const AutocompleteField = ({
  options = [],
  className,
  placeholder,
  value: propValue,
  onChange,
  ...props
}: {
  options: { value: string; label: string; render: ReactNode }[];
} & Omit<React.ComponentProps<'input'>, 'size'> &
  React.ComponentProps<'button'>) => {
  const [value, setValue] = useState<string>((propValue as string) ?? '');
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const isMobile = useIsMobile();
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().startsWith(search.toLowerCase()),
  );

  const Credenza = isMobile ? Drawer : Popover;
  const CredenzaTrigger = isMobile ? DrawerTrigger : PopoverTrigger;
  const CredenzaContent = isMobile ? DrawerContent : PopoverContent;

  const handleSelect = (value: string) => {
    onChange?.(value as any);
    setValue(value);
    setOpen(false);
  };

  return (
    <Credenza open={open} onOpenChange={setOpen} repositionInputs={false}>
      <CredenzaTrigger asChild>
        <Button
          tabIndex={0}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between text-base', className)}
          size="default"
          {...props}
        >
          {value ? (
            (options.find((o) => o.value === value)?.render ??
            value.split(':')[1])
          ) : (
            <span className="text-muted-foreground font-normal">
              {placeholder}
            </span>
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </CredenzaTrigger>
      <CredenzaContent
        className="w-[var(--radix-popover-trigger-width)] h-[80vh] md:h-fit p-0"
        align="start"
      >
        {!isMobile ? null : (
          <DrawerHeader>
            <DrawerTitle>{placeholder}</DrawerTitle>
          </DrawerHeader>
        )}
        <Command defaultValue="-" shouldFilter={false}>
          <CommandInput
            placeholder="Search"
            className="h-9 text-base"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-full md:max-h-[300px]">
            <CommandEmpty>No match found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((o) => (
                <CommandItem
                  key={o.value}
                  value={o.value}
                  onSelect={handleSelect}
                  className="text-base"
                >
                  {o.render}
                  <Check
                    className={cn(
                      'ml-auto',
                      value === o.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
              {!filteredOptions.length && search.length > 0 && (
                <CommandItem
                  className="text-base"
                  value={`__new__:${search}`}
                  onSelect={handleSelect}
                >
                  <div className="flex gap-2 items-center">
                    <PlusIcon /> Create &#34;{search}&#34;
                  </div>
                  <Check
                    className={cn(
                      'ml-auto',
                      value === `__new__:${search}`
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </CredenzaContent>
    </Credenza>
  );
};
