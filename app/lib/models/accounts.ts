export const accountTypes = [
  'asset',
  'liability',
  'income',
  'expense',
] as const;

export type AccountType = (typeof accountTypes)[number];

/**
 * Normalized model of an account
 */
export interface Account {
  id: string;

  /** Name of account, recommended "<institution name> <account name>" */
  name: string;

  /** Type of this account */
  type: AccountType;

  /** Institution domain, used for to display account logo */
  domain?: string;
}
