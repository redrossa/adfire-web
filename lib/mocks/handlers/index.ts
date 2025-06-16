import { handlers as accountHandlers } from './accounts';
import { handlers as transactionHandlers } from './transactions';

export const handlers = [...accountHandlers, ...transactionHandlers];
