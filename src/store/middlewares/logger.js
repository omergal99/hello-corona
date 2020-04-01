import { createLogger } from 'redux-logger';

export const logger = createLogger({
  diff: true,
  collapsed: (getState, action, logEntry) => !logEntry.error
});