import { handlers as accountHandlers } from './handlers/accounts';
import { handlers as transactionHandlers } from './handlers/transactions';
import { setupServer } from 'msw/node';

export const server = setupServer(...accountHandlers, ...transactionHandlers);
