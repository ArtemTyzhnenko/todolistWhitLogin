import React from 'react';
import ReactDOM from 'react-dom';
import APP from './components/APP';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <APP/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('todo'));






