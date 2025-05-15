import { Button, Field, Input, Label } from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/24/outline';

const TransactionEntryEditor = () => {
  return (
    <div className="flex gap-4">
      <Field className="flex flex-col flex-1">
        <Label className="h6">Account</Label>
        <Input
          placeholder="Account or Merchant Name"
          className="p mt-2 border py-2 px-4 outline-none data-[focus]:border-blue-500"
        />
      </Field>
      <Field className="flex flex-col">
        <Label className="h6">Date</Label>
        <Input
          placeholder="YYYY-MM-DD"
          className="p mt-2 border py-2 px-4 outline-none data-[focus]:border-blue-500"
        />
      </Field>
      <Field className="flex flex-col basis-1/6">
        <Label className="h6">Amount</Label>
        <Input
          type="number"
          placeholder="USD"
          className="p mt-2 border py-2 px-4 outline-none data-[focus]:border-blue-500"
        />
      </Field>
      <Field>
        <Button className="rounded-full hover:bg-gray-100 hover:text-inherit text-gray-700 transition p-4 mt-8">
          <TrashIcon className="w-8 h-8" />
        </Button>
      </Field>
    </div>
  );
};

export default TransactionEntryEditor;
