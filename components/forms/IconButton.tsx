import { Button } from '@headlessui/react';
import * as React from 'react';

interface Props extends React.ComponentProps<typeof Button> {
  Icon: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;
  [key: string]: any;
}

const IconButton = ({ Icon, className, ...props }: Props) => {
  return (
      <Button
          className={`rounded-full data-[active]:bg-neutral-100 data-[hover]:text-blue-500 data-[disabled]:text-neutral-500 transition ease-out p-4 ${className}`}
          {...props}
      >
        <Icon className="w-8 h-8" />
      </Button>
  );
};

export default IconButton;