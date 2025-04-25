import Image from 'next/image';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { auth, signOut } from '@/auth';
import Link from 'next/link';
import { ArrowLeftStartOnRectangleIcon, Cog8ToothIcon, UserIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', current: true, disabled: true },
  { name: 'Activities', href: '/activities', current: false, disabled: true }
];

const profileMenus = [
  { name: 'Profile', Icon: UserIcon, href: '/profile', disabled: true },
  { name: 'Settings', Icon: Cog8ToothIcon, href: '/settings' }
];

const Navbar = async () => {
  const session = await auth();
  return (
      <nav>
        <div className="mx-auto px-12 sm:px-16 lg:px-18 h-24 py-6">
          <div className="relative flex h-16 items-center justify-between">
            {session?.user && (
                <>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex shrink-0 items-center">
                      <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/vercel.svg"
                            alt="Logo"
                            width={16}
                            height={16}
                        />
                      </Link>
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {navigation.filter(item => !item.disabled).map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                aria-current={item.current ? 'page' : undefined}
                                className="rounded-md px-3 py-2 text-sm font-medium"
                            >
                              <p>{item.name}</p>
                            </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Menu as="div" className="relative ml-3">
                    <MenuButton
                        className="relative flex rounded-full bg-gray-800 text-sm transition ring-gray-200 hover:ring-4 data-[active]:ring-4 outline-offset-4">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Image
                          alt="Profile"
                          src={session.user.image as string}
                          className="rounded-full"
                          width={32}
                          height={32}
                      />
                    </MenuButton>
                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 outline-none transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
                    >
                      {profileMenus.filter(item => !item.disabled).map((item) => (
                          <MenuItem key={item.name}>
                            <Link
                                href="#"
                                className="flex items-center gap-4 w-full px-4 py-2 text-sm text-neutral-700 data-[focus]:bg-gray-100 data-[focus]:outline-hidden"
                            >
                              <item.Icon className="w-8 h-8" />
                              <p>{item.name}</p>
                            </Link>
                          </MenuItem>
                      ))}
                      <form
                          action={async () => {
                            'use server';
                            await signOut();
                          }}
                      >
                        <MenuItem>
                          <button
                              type="submit"
                              className="flex items-center gap-4 w-full px-4 py-2 text-sm text-red-500 data-[focus]:bg-gray-100 data-[focus]:outline-hidden"
                          >
                            <ArrowLeftStartOnRectangleIcon className="w-8 h-8" />
                            <p>Sign out</p>
                          </button>
                        </MenuItem>
                      </form>
                    </MenuItems>
                  </Menu>
                </>
            )}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;