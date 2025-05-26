import { Control, Controller, UseControllerProps } from 'react-hook-form';
import { DatePicker } from '@heroui/date-picker';
import { parseDate } from '@internationalized/date';

interface DateFieldProps extends UseControllerProps<any> {
  control: Control<any>;
  name: string;
  errorMessage?: string;
}

const DateField = ({ control, name, errorMessage }: DateFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: 'Date is required',
      }}
      render={({ field }) => (
        <DatePicker
          aria-label="Date picker"
          variant="faded"
          value={field.value ? parseDate(field.value) : null}
          onChange={(v) => {
            field.onChange(v?.toString());
          }}
          onBlur={field.onBlur}
          isInvalid={!!errorMessage}
          errorMessage={errorMessage}
          selectorButtonProps={{
            disableRipple: true,
          }}
        />
      )}
    />
  );
};

export default DateField;
