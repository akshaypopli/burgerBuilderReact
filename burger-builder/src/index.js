import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


// axios.defaults.baseURL('https://react-burger-builder-63567.firebaseio.com/')
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
