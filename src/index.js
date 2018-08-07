import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from '@uifabric/icons';
import './index.css';
import 'office-ui-fabric-react/dist/css/fabric.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

initializeIcons();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
