import { Control, useController, UseControllerProps } from 'react-hook-form';
import { Key, useState } from 'react';
import { useFilter } from '@react-aria/i18n';
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
} from '@heroui/autocomplete';
import { AccountOption } from '@/components/AccountSelector/utils';

interface FieldState {
  selectedKey: Key | null;
  inputValue: string;
  options: AccountOption[];
}

interface AccountSelectorProps extends UseControllerProps<any> {
  options: AccountOption[];
  control: Control<any>;
  name: string;
  errorMessage?: string;
}

const AccountSelector = ({
  options,
  control,
  name,
  errorMessage,
}: AccountSelectorProps) => {
  const { field } = useController({
    control,
    name,
    rules: { required: 'Account is required' },
  });

  const [fieldState, setFieldState] = useState<FieldState>({
    selectedKey: field.value?.text ?? '',
    inputValue: field.value?.text ?? '',
    options,
  });

  const { startsWith } = useFilter({ sensitivity: 'base' });

  const createCustomOption = (text: string): AccountOption => {
    return {
      text,
      isNew: true,
      isMerchant: true,
      accountName: text,
      userName: '',
      userMask: '',
      userId: '',
    };
  };

  const onSelectionChange = (key: Key | null) => {
    setFieldState((prevState) => {
      const selected = options.find((o) => o.text === key);
      if (selected) {
        field.onChange(selected);
        return {
          inputValue: selected?.text ?? '',
          selectedKey: key,
          options: options.filter((o) =>
            startsWith(o.text, selected?.text ?? ''),
          ),
        };
      } else {
        // create new merchant
        field.onChange(
          prevState.inputValue
            ? createCustomOption(prevState.inputValue)
            : null,
        );
        return {
          inputValue: prevState.inputValue,
          selectedKey: prevState.inputValue,
          options: prevState.options,
        };
      }
    });
  };

  const onInputChange = (value: string) => {
    let filteredOptions = options.filter((o) => startsWith(o.text, value));
    if (filteredOptions.length === 0) {
      filteredOptions = [createCustomOption(value)];
    }
    setFieldState((prevState) => ({
      inputValue: value,
      selectedKey: prevState.selectedKey,
      options: filteredOptions,
    }));
  };

  const onOpenChange = () => {
    setFieldState((prevState) => ({
      inputValue: prevState.inputValue,
      selectedKey: prevState.selectedKey,
      options,
    }));
  };

  const groupItems = (options: AccountOption[]) => {
    const grouped: { [key: string]: AccountOption[] } = {};

    const accounts = options.filter((o) => !o.isMerchant);
    if (accounts.length > 0) {
      grouped['Your accounts'] = accounts;
    }

    const merchants = options.filter((o) => o.isMerchant);
    if (merchants.length > 0) {
      grouped['Merchants'] = merchants;
    }

    return Object.entries(grouped);
  };

  return (
    <Autocomplete
      isClearable={false}
      aria-label="Account selector"
      allowsCustomValue
      variant="faded"
      placeholder="Select an account or enter a new merchant"
      items={groupItems(fieldState.options)}
      inputValue={fieldState.inputValue}
      selectedKey={fieldState.selectedKey as any}
      onInputChange={onInputChange}
      onSelectionChange={onSelectionChange}
      onOpenChange={onOpenChange}
      onBlur={field.onBlur}
      errorMessage={errorMessage}
      isInvalid={!!errorMessage}
      inputProps={{
        classNames: { input: 'p' },
      }}
      selectorButtonProps={{
        disableRipple: true,
      }}
    >
      {([groupName, options]) => (
        <AutocompleteSection title={groupName} key={groupName}>
          {options.map((o) => (
            <AutocompleteItem key={o.text} textValue={o.text}>
              {!o.isNew ? (
                <div>
                  <p>
                    {o.accountName}
                    {!o.isMerchant && (
                      <code className="opacity-60">#{o.userMask}</code>
                    )}
                  </p>
                  {!o.isMerchant && (
                    <small className="opacity-60">{o.userName}</small>
                  )}
                </div>
              ) : (
                `Create new "${o.text}"`
              )}
            </AutocompleteItem>
          ))}
        </AutocompleteSection>
      )}
    </Autocomplete>
  );
};

export default AccountSelector;
