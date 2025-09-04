import { handlers as accountHandlers } from './handlers/accounts';
import { handlers as transactionHandlers } from './handlers/transactions';
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(...accountHandlers, ...transactionHandlers);
