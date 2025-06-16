import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { SessionProvider } from 'next-auth/react';
import Footer from '@/components/Footer';
import { HeroUIProvider } from '@heroui/system';
import { ThemeProvider } from 'next-themes';
import { server } from '@/lib/mocks/node';

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
  description:
    'Track your finances, devise strategies, project the future with Adfire',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.RUNTIME !== 'production') {
    server.listen();
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans tracking-[-0.25px] antialiased has-data-home:bg-zinc-50 dark:has-not-data-home:before:hidden dark:has-data-home:bg-zinc-950`}
      >
        <HeroUIProvider>
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
                      {children}
                    </main>
                    <Footer />
                  </div>
                </div>
              </div>
            </ThemeProvider>
          </SessionProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
