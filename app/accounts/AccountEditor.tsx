import { Button, Field, Fieldset, Input, Label } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Container from '@/components/Container';
import AccountUserEditor from '@/app/accounts/AccountUserEditor';

const AccountEditor = () => {
  return (
      <Container className="p-16 bg-background" float>
        <Fieldset>
          <Field className="flex flex-col">
            <Label className="h6">Account Name</Label>
            <Input placeholder="Chase Freedom Unlimited"
                   className="p mt-2 border py-2 px-4 outline-none data-[focus]:border-blue-500" />
          </Field>
          <div className="mt-8 border-t border-foreground pt-8">
            <AccountUserEditor />
          </div>
          <Button
              className="mt-8 flex items-center gap-2 border border-solid border-transparent transition-colors font-medium hover:text-blue-600 py-2 px-4">
            <PlusIcon className="w-6 h-6" />
            <p>Add users</p>
          </Button>
          <div className="mt-8 flex items-center gap-2">
            <Button
                as={Link}
                href="/accounts"
                className="p ml-auto inline-flex items-center gap-2 rounded-sm border border-solid border-transparent transition-colors font-medium hover:text-blue-600 py-2 px-4">
              Cancel
            </Button>
            <Button
                className="p inline-flex items-center gap-2 rounded-sm border border-solid border-transparent transition-colors bg-foreground font-medium text-background hover:bg-blue-600 py-2 px-4">
              Save
            </Button>
          </div>
        </Fieldset>
      </Container>
  );
};

export default AccountEditor;