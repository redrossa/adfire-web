import { Description, Field, Input, Label } from '@headlessui/react';
import { InputHTMLAttributes } from 'react';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string | null;
}

const TextField = ({
  label,
  description,
  placeholder,
  error,
  className,
  ...props
}: TextFieldProps) => (
  <Field className={`flex flex-col gap-2 ${className}`}>
    {label && <Label className="h6">{label}</Label>}
    {description && <Description className="p">{description}</Description>}
    <Input
      placeholder={placeholder}
      className="p border py-2 px-4 outline-none data-[focus]:border-blue-500 data-[invalid]:border-red-500"
      invalid={!!error}
      {...props}
    />
    {error && (
      <small role="alert" className="text-red-500">
        {error}
      </small>
    )}
  </Field>
);

export default TextField;
