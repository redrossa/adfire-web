'use client';

import { Combobox as HeadlessCombobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { TextField } from '@/components/forms';
import { useEffect, useState } from 'react';
import { TextFieldProps } from '@/components/forms/TextField';

export interface ComboboxOption {
  key: string;
}

export interface ComboboxProps<T extends ComboboxOption> extends Pick<TextFieldProps, 'label' | 'description' | 'error'> {
  options: T[];
  allowCustom?: boolean;
  children: (data: T | string) => React.ReactNode;
  value?: T;
  onChange?: (value: T | null) => void;
  [key: string]: any;
}

const Combobox = <T extends ComboboxOption>({
  options,
  allowCustom,
  children,
  value,
  onChange,
  ...props
}: ComboboxProps<T>) => {
  const [selected, setSelected] = useState<T | null>(value || null);
  const [query, setQuery] = useState('');

  const filtered = query === '' ? options : options.filter((o) =>
      o.key.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (value: T | null) => {
    setSelected(value);
    onChange?.(value);
  }

  return (
      <HeadlessCombobox immediate value={selected} by="key" onChange={handleChange} onClose={() => setQuery('')}>
        <ComboboxInput
            as={TextField}
            {...props}
            displayValue={(o: T | null) => o?.key || ''}
            onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxOptions anchor="bottom start" className="w-[--input-width] border empty:invisible rounded-sm">
          {allowCustom && query.length > 0 && filtered.length === 0 && (
              <ComboboxOption
                  value={{ key: query } satisfies ComboboxOption}
                  className="group flex gap-2 px-4 py-2 bg-white data-[focus]:bg-gray-100 cursor-pointer"
              >
                {children(query)}
              </ComboboxOption>
          )}
          {filtered.map((o) => (
              <ComboboxOption
                  key={o.key}
                  value={o}
                  className="group flex gap-2 px-4 py-2 bg-white data-[focus]:bg-gray-100 cursor-pointer"
              >
                {children(o)}
              </ComboboxOption>
          ))}
        </ComboboxOptions>
      </HeadlessCombobox>
  );
};

export default Combobox;