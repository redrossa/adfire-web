import { deltaDollarFormatter, premiumDollarFormatter } from '@/lib/utils';
import { Chip, ChipProps } from '@heroui/chip';

export interface Props {
  amount: number;
  isDelta?: boolean;
  variant?: ChipProps['variant'];
}

const DollarChip = ({ amount, isDelta, variant = 'flat' }: Props) => (
  <Chip
    variant={variant}
    radius="md"
    size="lg"
    color={amount >= 0 ? 'success' : 'danger'}
  >
    <code>
      {(isDelta ? deltaDollarFormatter : premiumDollarFormatter).format(amount)}
    </code>
  </Chip>
);

export default DollarChip;
