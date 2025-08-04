export interface Account {
  name: string;
  type: 'asset' | 'liability' | 'merchant';
  logo?: string;
}
