import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const configureStore = () => {

  const middlewares = [thunk];

  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`./middlewares/logger`);
    middlewares.push(logger);
  }

  return createStore(
    reducers,
    applyMiddleware(...middlewares)
  );
};

const store = configureStore();

export default store;