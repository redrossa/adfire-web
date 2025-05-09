export interface Account {
  id?: string;
  name: string;
  users: AccountUser[];
}

export interface AccountUser {
  name: string;
  mask: string;
}
