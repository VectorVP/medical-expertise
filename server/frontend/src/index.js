import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
// connect redux store 
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
