import { deltaDollarFormatter, premiumDollarFormatter } from '@/lib/utils';
import { Chip } from '@heroui/chip';

export interface Props {
  amount: number;
  isDelta?: boolean;
}

const DollarChip = ({ amount, isDelta }: Props) => (
  <Chip
    variant="flat"
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
