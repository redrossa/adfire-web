'use client';

import {
  Line,
  LineChart,
  ReferenceLine,
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
import { dayjs, dollarFormatter } from '@/lib/utils';
import { useEffect, useState } from 'react';
import NumberFlow from '@number-flow/react';
import { useTheme } from 'next-themes';
import { semanticColors } from '@heroui/theme';

interface Props {
  data: TimeSeriesPoint[];
}

const Chart = ({ data }: Props) => {
  const latest = data.length > 0 ? data[data.length - 1] : null;
  const min = Math.min(...data.map((d) => d.cumulative));

  const [displayValue, setDisplayValue] = useState<number>(
    latest?.cumulative ?? 0,
  );
  const { theme } = useTheme();
  const [prefersDarkScheme, setPrefersDarkScheme] = useState<boolean>();
  const [color, setColor] = useState<string>();

  const handleMouseMove = (state: any) => {
    if (state.isTooltipActive && state.activePayload.length) {
      setDisplayValue(state.activePayload[0].payload.cumulative);
    }
  };

  const handleMouseLeave = () => {
    setDisplayValue(latest?.cumulative ?? 0);
  };

  useEffect(() => {
    setPrefersDarkScheme(
      window.matchMedia('(prefers-color-scheme: dark)').matches,
    );
  }, []);

  useEffect(() => {
    const t =
      (prefersDarkScheme && theme === 'system') || theme === 'dark'
        ? 'dark'
        : 'light';
    setColor(
      !!latest && latest.cumulative >= 0
        ? (semanticColors[t].success as any).DEFAULT
        : (semanticColors[t].danger as any).DEFAULT,
    );
  }, [latest, min, prefersDarkScheme, theme]);

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
            <ReferenceLine y={data[0].cumulative} strokeDasharray="3 3" />
            <Line dataKey="cumulative" stroke={color} dot={false} />
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
        <h5 className={value >= 0 ? 'text-success' : 'text-danger'}>
          {dollarFormatter.format(value)}
        </h5>
        <small>{dayjs(label).format('ll')}</small>
      </CardBody>
    </Card>
  );
};

export default Chart;
