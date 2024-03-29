import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './stores/store';
import App from './App';

import './index.css';

 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
 