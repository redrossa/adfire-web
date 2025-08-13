'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/components/ui/chart';
import { Line, LineChart, ReferenceLine, XAxis, YAxis } from 'recharts';
import { useState } from 'react';
import { dayjs, premiumDollarFormatter } from '@/app/lib/utils/format';
import { Balance } from '@/app/lib/models/balances';

interface Props {
  balances: Balance[];
}

const BalanceChart = ({ balances }: Props) => {
  const config: ChartConfig = {
    amount: {
      label: 'Balance',
      color: '#60a5fa',
    },
  };
  balances.sort((a, b) => a.date.localeCompare(b.date));
  const reference = balances[0];
  const latest = balances[balances.length - 1];
  const [displayValue, setDisplayValue] = useState<number>(latest.amount);

  const handleMouseMove = (state: any) => {
    if (state.isTooltipActive && state.activePayload.length) {
      setDisplayValue(state.activePayload[0].payload.cumulative);
    }
  };

  const handleMouseLeave = () => {
    setDisplayValue(latest.amount);
  };

  return (
    <ChartContainer config={config}>
      <LineChart
        accessibilityLayer
        data={balances}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <YAxis type="number" domain={['dataMin', 'dataMax']} hide />
        <XAxis
          dataKey="date"
          tickLine={false}
          interval="preserveStartEnd"
          display="none"
        />
        <ChartTooltip
          position={{ y: 0 }}
          content={
            <ChartTooltipContent
              hideIndicator
              labelFormatter={(date) => dayjs(date).format('LL')}
              formatter={(amount) =>
                premiumDollarFormatter.format(amount as number)
              }
            />
          }
        />
        <ReferenceLine
          y={reference.amount}
          stroke="var(--muted-foreground)"
          strokeDasharray="3 3"
        />
        <Line
          dataKey="amount"
          type="linear"
          stroke="var(--color-amount)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default BalanceChart;
