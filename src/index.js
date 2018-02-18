import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';   // add

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

injectTapEventPlugin();  // add

ReactDOM.render((
<BrowserRouter>
    <App />
</BrowserRouter>),
document.getElementById('root'));

registerServiceWorker();
