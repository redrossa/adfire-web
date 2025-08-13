import { Account } from '@/app/lib/models/accounts';

type AccountTable = Account;

export const accounts: AccountTable[] = [
  {
    name: 'Wealthfront Individual',
    type: 'asset',
    domain: 'wealthfront.com',
    id: 'J5LHY2GZ',
  },
  {
    name: 'Robinhood Individual',
    type: 'asset',
    domain: 'robinhood.com',
    id: 'e86E0cCa',
  },
  {
    name: 'Chase Total Checking',
    type: 'asset',
    domain: 'chase.com',
    id: 'TZMnAPEk',
  },
  {
    name: 'Capital One 360',
    type: 'asset',
    domain: 'capitalone.com',
    id: '7ungECL1',
  },
  {
    name: 'Amex Gold',
    type: 'liability',
    domain: 'americanexpress.com',
    id: '3FbVcPJm',
  },
  {
    name: 'Prime Visa',
    type: 'liability',
    domain: 'chase.com',
    id: 'Ic9pEsfl',
  },
  {
    name: 'Alight 401k',
    type: 'asset',
    domain: 'alight.com',
    id: 'DJovyjfd',
  },
  {
    name: 'Alight HSA',
    type: 'asset',
    domain: 'alight.com',
    id: 'v8HVcWt8',
  },
  {
    name: 'Amazon Balance',
    type: 'asset',
    id: 'ioHxo_Mi',
  },
  {
    name: 'SLB',
    type: 'income',
    domain: 'slb.com',
    id: 'hWOKj1op',
  },
  {
    name: 'Uncle Sam',
    type: 'expense',
    domain: 'irs.gov',
    id: 'm-DKMu5b',
  },
  {
    name: 'Medical Insurance',
    type: 'expense',
    id: 'Tv1nVIW2',
  },
  {
    name: 'Dental Insurance',
    type: 'expense',
    id: 'nY4eiM3q',
  },
  {
    name: 'Vision Insurance',
    type: 'expense',
    id: 'zPrA2pg0',
  },
  {
    name: 'Amazon',
    type: 'expense',
    domain: 'amazon.com',
    id: 'F1MxvmzH',
  },
  {
    name: 'HEB',
    type: 'expense',
    domain: 'heb.com',
    id: 'EuDTL_l3',
  },
  {
    name: 'HEB Pharmacy',
    type: 'expense',
    domain: 'heb.com',
    id: 'M9edtd49',
  },
  {
    name: 'Robinhood Fee',
    type: 'expense',
    domain: 'robinhood.com',
    id: '8iTVD5l5',
  },
];

export const accountMap: { [key: string]: AccountTable } = Object.fromEntries(
  accounts.map((a) => [a.name, a]),
);
