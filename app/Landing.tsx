import { metadata } from '@/app/layout';
import { signIn } from '@/auth';
import { Button } from '@heroui/button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Landing = () => {
  return (
    <>
      <h4>{metadata.description}</h4>
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
        <Button
          type="submit"
          color="primary"
          endContent={
            <ArrowRightIcon className="opacity-60 w-4 h-auto" aria-hidden />
          }
          disableRipple
        >
          Sign In
        </Button>
      </form>
    </>
  );
};

export default Landing;
