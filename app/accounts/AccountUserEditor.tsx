import { Button, Field, Input, Label } from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/24/outline';

const AccountUserEditor = () => {
  return (
      <div className="flex gap-2">
        <Field className="flex-1 flex flex-col">
          <Label className="h6">Cardholder Name</Label>
          <Input placeholder="John Doe"
                 className="p mt-2 border py-2 px-4 outline-none data-[focus]:border-blue-500" />
        </Field>
        <Field className="flex flex-col">
          <Label className="h6">Mask</Label>
          <Input placeholder="0000"
                 className="p mt-2 border py-2 px-4 outline-none data-[focus]:border-blue-500" />
        </Field>
        <Field>
          <Button className="rounded-full hover:bg-gray-100 hover:text-inherit text-gray-700 transition p-4 mt-8">
            <TrashIcon className="w-8 h-8" />
          </Button>
        </Field>
      </div>
  );
};

export default AccountUserEditor;