import React from 'react';
import { createRoot } from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-calendar/dist/Calendar.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import { StoreContext, store } from './app/stores/store';
import { createBrowserHistory } from "history";
import { Router } from 'react-router-dom';

const history = createBrowserHistory();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <StoreContext.Provider value={store}>
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>
)