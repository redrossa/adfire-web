export interface Account {
  id?: string;
  name: string;
  isMerchant: boolean;
  users: AccountUser[];
}

export interface AccountUser {
  id?: string;
  name: string;
  mask: string;
}
