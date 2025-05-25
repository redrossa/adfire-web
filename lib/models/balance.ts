export interface TimeSeriesPoint {
  date: string;
  amount: number;
  cumulative: number;
}

export interface Balance {
  balances: TimeSeriesPoint[];
}
