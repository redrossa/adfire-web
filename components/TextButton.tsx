import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode | Array<React.ReactNode>;
}

const TextButton = ({ children, ...props }: Props) => {
  return (
      <button {...props} className="transition-colors font-medium hover:text-blue-500 hover:cursor-pointer">
        <p>{children}</p>
      </button>
  );
};

export default TextButton;