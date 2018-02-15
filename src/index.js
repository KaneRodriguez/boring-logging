import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';   // add

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

injectTapEventPlugin();  // add

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
