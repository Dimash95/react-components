import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import ErrorBoundary from './components/error-boundary';
import { store } from './store';
import { Provider } from 'react-redux';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
