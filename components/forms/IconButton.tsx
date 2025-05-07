import { Button } from '@headlessui/react';
import * as React from 'react';

interface Props extends React.ComponentProps<typeof Button> {
  Icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;
  [key: string]: any;
}

const IconButton = ({ Icon, className, ...props }: Props) => {
  return (
      <Button
          className={`rounded-full data-[hover]:[&:not([data-disabled])]:bg-neutral-100 data-[active]:[&:not([data-disabled])]:bg-neutral-200 data-[hover]:[&:not([data-disabled])]:text-blue-500 data-[active]:[&:not([data-disabled])]:text-blue-600 data-[disabled]:text-neutral-500 transition-colors ease-out p-4 ${className}`}
          {...props}
      >
        <Icon className="w-7 h-7" />
      </Button>
  );
};

export default IconButton;