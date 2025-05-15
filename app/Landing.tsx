import { metadata } from '@/app/layout';
import { signIn } from '@/auth';
import { Button } from '@headlessui/react';

const Landing = () => {
  return (
    <>
      <h3 className="mt-24">{metadata.description}</h3>
      <h4 className="my-10 font-light">
        The platform to help you visualize your finances to achieve your FIRE
        goal.
      </h4>
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <Button
          type="submit"
          className="p inline-flex items-center gap-2 rounded-sm border border-solid border-transparent transition-colors bg-foreground font-medium text-background hover:bg-blue-600 py-2 px-4"
        >
          Sign In
        </Button>
      </form>
    </>
  );
};

export default Landing;
