'use client';

import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip as TooltipRC,
  TooltipProps,
  XAxis,
} from 'recharts';
import { TimeSeriesPoint } from '@/lib/models/balance';
import { Card, CardBody } from '@heroui/card';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { dayjs, dollarFormatter } from '@/lib/utils';
import { useState } from 'react';
import NumberFlow from '@number-flow/react';

interface Props {
  data: TimeSeriesPoint[];
}

const SUCCESS_COLOR = '#17c964';

const DANGER_COLOR = '#f31260';

const Chart = ({ data }: Props) => {
  const latest = data[data.length - 1];
  const [displayValue, setDisplayValue] = useState<number>(latest.cumulative);

  const handleMouseMove = (state: any) => {
    if (state.isTooltipActive && state.activePayload.length) {
      setDisplayValue(state.activePayload[0].payload.cumulative);
    }
  };

  const handleMouseLeave = () => {
    setDisplayValue(latest.cumulative);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className={displayValue >= 0 ? 'text-success' : 'text-danger'}>
        <NumberFlow
          value={displayValue}
          format={{
            style: 'currency',
            currency: 'USD',
          }}
        />
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <XAxis dataKey="date" display="none" />
          <TooltipRC position={{ y: 0 }} content={<Tooltip />} />
          <ReferenceLine
            y={data[0].amount}
            stroke="#a1a1aa"
            strokeDasharray="3 3"
          />
          <Line
            dataKey="cumulative"
            stroke={latest.cumulative >= 0 ? SUCCESS_COLOR : DANGER_COLOR}
          />
        </LineChart>
      </ResponsiveContainer>
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
        <h5 className={value >= 0 ? 'text-success' : 'text-danger'}>
          {dollarFormatter.format(value)}
        </h5>
        <small>{dayjs(label).format('ll')}</small>
      </CardBody>
    </Card>
  );
};

export default Chart;
