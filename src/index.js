
import React from 'react';
import { render } from 'react-dom';

import store from './store/AppStore';
import * as ActionTypes from './store/ActionTypes';

import './assets/css/Index.scss';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

render(
  <Root store={store} />,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();


serviceWorker.register({
  // Page has been saved for offline use.
  onSuccess: () => console.log('onSuccess') || store.dispatch({ type: ActionTypes.SW_INIT }),
  // ----------------------
  // Click to get the latest version.
  onUpdate: reg => console.log('onUpdate', reg) || store.dispatch({ type: ActionTypes.SW_UPDATE, payload: reg }),
});