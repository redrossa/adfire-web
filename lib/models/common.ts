export type Create<T extends { id: any }> = Omit<T, 'id'>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Update<T extends { id: any }> = PartialBy<T, 'id'>;
