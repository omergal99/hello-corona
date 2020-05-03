
import React from 'react';
import { render } from 'react-dom';

import store from './store/AppStore';

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
serviceWorker.register();
