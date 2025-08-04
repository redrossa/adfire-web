import { signIn } from '@/auth';
import { Button } from '@/app/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  const handleSignIn = async () => {
    'use server';
    await signIn('google');
  };

  return (
    <section className="relative overflow-hidden py-32">
      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <Image
                src="/adfire.svg"
                alt="Adfire Logo"
                width={128}
                height={128}
                className="dark:invert"
              />
            </div>
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Tax-aware budgeting with{' '}
                <span className="text-primary">Adfire</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Get deduction tips, project tax scenarios, and file taxes—all
                through a budgeting app.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                className="shadow-sm transition-shadow hover:shadow"
                onClick={handleSignIn}
              >
                Get Started
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
