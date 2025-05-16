import { metadata } from '@/app/layout';
import { signIn } from '@/auth';
import { Button } from '@/components/button';
import { ArrowRightIcon } from 'lucide-react';

const Landing = () => {
  return (
    <>
      <h4 className="">{metadata.description}</h4>
      <p className="mb-4">
        The platform to help you visualize your finances to achieve your FIRE
        goal.
      </p>
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <Button type="submit" className="group">
          Sign In
          <ArrowRightIcon
            className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
            size={16}
            aria-hidden
          />
        </Button>
      </form>
    </>
  );
};

export default Landing;
