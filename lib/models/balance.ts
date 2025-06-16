export interface TimeSeriesPoint {
  date: string;
  amount: number;
}

export interface Balance {
  balances: TimeSeriesPoint[];
}
