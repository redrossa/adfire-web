'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { z } from 'zod';
import { accountTypes } from '@/app/lib/models/accounts';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AccountForm } from '@/app/components/accounts/schemas';
import { getInitials } from '@/app/lib/selectors/accounts';

interface Props {
  form: UseFormReturn<AccountForm>;
}

const AccountEdit = ({ form }: Props) => {
  const onSubmit = (values: z.infer<AccountForm>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  const [name, setName] = useState<string>(form.getValues('name'));
  const initials = getInitials(name, true);

  const [logo, setLogo] = useState<string | undefined>(form.getValues('logo'));

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogo(e.currentTarget.value || undefined);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-2 items-start justify-betweens">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Amex Gold"
                    onChangeCapture={handleNameChange}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Recommended format <i>&lt;institution&gt; &lt;account&gt;</i>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="min-w-32">
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize w-full">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {accountTypes.map((type) => (
                      <SelectItem
                        key={type}
                        value={type}
                        className="capitalize"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL</FormLabel>
              <FormControl>
                <div className="flex gap-4">
                  <Input
                    placeholder="data:image/png;base64..."
                    onChangeCapture={handleLogoChange}
                    {...field}
                  />
                  <Avatar className="w-8 h-8 border self-center">
                    <AvatarImage src={logo} alt={name} />
                    <AvatarFallback className="font-light text-[0.75em]">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </FormControl>
              <FormDescription>
                Optional image link, institution logo recommended
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountEdit;
