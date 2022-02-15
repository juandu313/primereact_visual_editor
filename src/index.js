import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'prismjs/themes/prism-coy.css';

import App from './App';
import { HashRouter } from 'react-router-dom'
//import registerServiceWorker from './registerServiceWorker';

if (process.env.REACT_APP_EDITOR === 'code') {
    require('./assets/themes/mytheme/theme.scss');
}

ReactDOM.render(
    <HashRouter>
        <App></App>
    </HashRouter>,
    document.getElementById('root')
);
//registerServiceWorker();
