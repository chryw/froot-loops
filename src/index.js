import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { initializeIcons } from '@uifabric/icons';
import './index.css';
import 'office-ui-fabric-react/dist/css/fabric.css';
import App from './App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

initializeIcons();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
