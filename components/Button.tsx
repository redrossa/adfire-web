import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode | Array<React.ReactNode>;
}

const Button = ({ children, ...props }: Props) => {
  return (
      <button {...props}
              className="w-fit rounded-b-sm border border-solid border-transparent transition-colors bg-foreground font-medium text-background gap-2 hover:bg-blue-600 py-4 px-8">
        <p>{children}</p>
      </button>
  );
};

export default Button;