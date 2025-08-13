import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { ThemeProvider } from 'next-themes';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import server from '@/app/lib/mocks/handlers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Adfire',
  description: 'Tax-aware budgeting app',
};

interface RootProps {
  landing: React.ReactNode;
  children: React.ReactNode;
}

export default async function RootLayout({
  landing,
  children,
}: Readonly<RootProps>) {
  const session = await auth();
  if (process.env.NODE_ENV === 'development') {
    server.listen();
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans tracking-[-0.25px] antialiased`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="overflow-hidden px-4 supports-[overflow:clip]:overflow-clip sm:px-6">
              <div className="relative mx-auto w-full">
                <div className="relative flex min-h-screen flex-col">
                  <Header />
                  <main className="grow w-full max-w-6xl mx-auto">
                    {!session ? landing : children}
                  </main>
                  <Footer />
                </div>
              </div>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
