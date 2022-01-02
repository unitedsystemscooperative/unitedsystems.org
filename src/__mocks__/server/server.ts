import { setupServer } from 'msw/node';
import { defaultHandlers } from './defaultHandlers';

export const server = setupServer(...defaultHandlers);
