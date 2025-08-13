import { handlers as accountHandlers } from './accounts';
import { handlers as transactionHandlers } from './transactions';
import { setupServer } from 'msw/node';

const server = setupServer(...accountHandlers, ...transactionHandlers);

export default server;
