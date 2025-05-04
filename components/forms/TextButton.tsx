import { Button } from '@headlessui/react';
import * as React from 'react';

interface Props extends React.ComponentProps<typeof Button> {
  Icon?: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;
  text: string;
  [key: string]: any;
}

const TextButton = ({ Icon, text, className, ...props }: Props) => (
    <Button
        className={`flex items-center gap-2 rounded-sm border border-solid border-transparent transition-colors ease-out font-medium data-[active]:bg-neutral-100 data-[hover]:text-blue-500 data-[disabled]:text-neutral-500 py-2 px-4 ${className}`}
        {...props}
    >
      {Icon && <Icon className="w-8 h-8" />}
      <p>{text}</p>
    </Button>
);

export default TextButton;