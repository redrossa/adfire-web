'use client';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as TooltipRC,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { TimeSeriesPoint } from '@/lib/models/balance';
import { Card, CardBody } from '@heroui/card';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { dayjs, premiumDollarFormatter } from '@/lib/utils';
import { useState } from 'react';
import NumberFlow from '@number-flow/react';

interface Props {
  data: TimeSeriesPoint[];
}

const Chart = ({ data }: Props) => {
  const latest = data.length > 0 ? data[data.length - 1] : null;

  const [displayValue, setDisplayValue] = useState<number>(latest?.amount ?? 0);

  const handleMouseMove = (state: any) => {
    if (state.isTooltipActive && state.activePayload.length) {
      setDisplayValue(state.activePayload[0].payload.amount);
    }
  };

  const handleMouseLeave = () => {
    setDisplayValue(latest?.amount ?? 0);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3>
        <NumberFlow
          value={displayValue}
          format={{
            style: 'currency',
            currency: 'USD',
          }}
        />
      </h3>
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <YAxis domain={['dataMin', 'dataMax']} hide />
            <XAxis dataKey="date" hide />
            <TooltipRC position={{ y: 0 }} content={<Tooltip />} />
            <Line dataKey="amount" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

const Tooltip = <TValue extends ValueType, TName extends NameType>({
  active,
  payload,
  label,
}: TooltipProps<TValue, TName>) => {
  if (!active || !payload?.length) {
    return null;
  }

  const value = payload?.[0]?.value as number;
  return (
    <Card>
      <CardBody>
        <h5>{premiumDollarFormatter.format(value)}</h5>
        <small>{dayjs(label).format('ll')}</small>
      </CardBody>
    </Card>
  );
};

export default Chart;
