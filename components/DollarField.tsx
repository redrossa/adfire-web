import { Control, Controller, UseControllerProps } from 'react-hook-form';
import { NumberInput } from '@heroui/number-input';

interface DollarFieldProps extends UseControllerProps<any> {
  control: Control<any>;
  name: string;
  label?: string;
  errorMessage?: string;
}

const DollarField = ({
  control,
  name,
  label,
  errorMessage,
}: DollarFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: 'Amount is required',
      }}
      render={({ field }) => (
        <NumberInput
          aria-label="Amount in USD"
          variant="faded"
          placeholder="USD"
          label={label}
          labelPlacement="outside"
          formatOptions={{
            style: 'currency',
            currency: 'USD',
          }}
          classNames={{
            inputWrapper: '-mr-4',
            label: 'h6',
            input: 'p',
          }}
          value={field.value ?? null}
          onValueChange={field.onChange}
          onBlur={field.onBlur}
          isInvalid={!!errorMessage}
          errorMessage={errorMessage}
        />
      )}
    />
  );
};

export default DollarField;
