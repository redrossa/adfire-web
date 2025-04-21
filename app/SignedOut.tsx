import { metadata } from '@/app/layout';
import { signIn } from '@/auth';
import Button from '@/components/Button';

const SignedOut = () => {
  return (
      <div className="flex flex-col m-auto max-w-[96rem] min-w-[64rem]">
        <h3 className="mt-24 font-bold">{metadata.description}</h3>
        <h4 className="my-10 font-light">The platform to help you visualize your finances to achieve your FIRE
          goal.</h4>
        <form
            action={async () => {
              'use server';
              await signIn('google');
            }}
        >
          <Button type="submit">
            Sign In
          </Button>
        </form>
      </div>
  );
};

export default SignedOut;