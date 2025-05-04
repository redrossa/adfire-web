import { Button } from '@headlessui/react';
import * as React from 'react';

interface Props extends React.ComponentProps<typeof Button> {
  Icon?: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;
  text: string;
  [key: string]: any;
}

const SolidButton = ({ Icon, text, className, ...props }: Props) => (
    <Button
        className={`flex items-center gap-2 rounded-sm border border-solid border-transparent transition-colors ease-out font-medium bg-foreground text-background data-[hover]:bg-blue-500 data-[active]:bg-blue-600 data-[disabled]:bg-neutral-500 py-2 px-4 ${className}`}
        {...props}
    >
      {Icon && <Icon className="w-8 h-8" />}
      <p>{text}</p>
    </Button>
);

export default SolidButton;