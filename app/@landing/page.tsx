import { signIn } from '@/auth';
import { Button } from '@heroui/button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function LandingPage() {
  const handleSignIn = async () => {
    'use server';
    await signIn('google');
  };

  return (
    <div className="flex flex-col gap-12 max-sm:text-center">
      <div>
        <h1 className="mb-4 mt-14">Tax-aware budgeting with Adfire</h1>
        <p className="text-2xl opacity-60">
          Get deduction tips, project tax scenarios, and file taxes—all through
          a budgeting app.
        </p>
      </div>
      <form action={handleSignIn}>
        <Button
          type="submit"
          color="primary"
          endContent={
            <ArrowRightIcon className="opacity-60 w-4 h-auto" aria-hidden />
          }
          disableRipple
          size="lg"
          className="font-semibold text-lg"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
