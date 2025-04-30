import { Button, Field, Fieldset, Input, Label } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import TransactionEntryEditor from '@/app/transactions/TransactionEntryEditor';

const TransactionEditor = () => {
  return (
      <div className="container shadow-md p-16 bg-background">
        <Fieldset>
          <Field className="flex flex-col">
            <Label className="h6">Transaction Name</Label>
            <Input placeholder="Groceries"
                   className="p mt-2 border py-2 px-4 outline-none data-[focus]:border-blue-500" />
          </Field>
          <div className="mt-8 flex items-center gap-4">
            <h6>From</h6>
            <hr className="flex-1 border-foreground" />
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <TransactionEntryEditor />
            <Button
                className="flex items-center gap-2 border border-solid border-transparent transition-colors font-medium hover:text-blue-600 py-2 px-4">
              <PlusIcon className="w-6 h-6" />
              <p>Add payer</p>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <h6>To</h6>
            <hr className="flex-1 border-foreground" />
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <TransactionEntryEditor />
            <Button
                className="flex items-center gap-2 border border-solid border-transparent transition-colors font-medium hover:text-blue-600 py-2 px-4">
              <PlusIcon className="w-6 h-6" />
              <p>Add payee</p>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-2">
            <Button
                as={Link}
                href="/transactions"
                className="p ml-auto inline-flex items-center gap-2 rounded-sm border border-solid border-transparent transition-colors font-medium hover:text-blue-600 py-2 px-4">
              Cancel
            </Button>
            <Button
                className="p inline-flex items-center gap-2 rounded-sm border border-solid border-transparent transition-colors bg-foreground font-medium text-background hover:bg-blue-600 py-2 px-4">
              Save
            </Button>
          </div>
        </Fieldset>
      </div>
  );
};

export default TransactionEditor;