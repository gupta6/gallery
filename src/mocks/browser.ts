import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Setup the worker
export const worker = setupWorker(...handlers);
