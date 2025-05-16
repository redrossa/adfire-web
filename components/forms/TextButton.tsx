import { Button } from '@headlessui/react';
import * as React from 'react';

type Role = 'info' | 'success' | 'warning' | 'alert';

export interface TextButtonProps extends React.ComponentProps<typeof Button> {
  Icon?: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  role?: Role;
  [key: string]: any;
}

const TextButton = ({
  Icon,
  text,
  role,
  className,
  ...props
}: TextButtonProps) => (
  <Button
    className={`
        flex items-center gap-2 rounded-sm border border-solid border-transparent transition-colors ease-out font-medium 
        active:bg-neutral-200 hover:bg-neutral-100 
        ${(!role || role === 'info') && 'active:text-blue-600 hover:text-blue-500'}
        ${role === 'success' && 'active:text-green-600 text-green-500'}
        ${role === 'warning' && 'active:text-yellow-600 text-yellow-500'}
        ${role === 'alert' && 'active:text-red-600 text-red-500'}
        data-disabled:text-neutral-500 
        py-2 px-4 ${className}`}
    {...props}
  >
    {Icon && <Icon className="w-7 h-7" />}
    <p>{text}</p>
  </Button>
);

export default TextButton;
