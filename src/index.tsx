import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { router } from './routes';
import { store } from './store';

import Header from './components/Header';
import './index.sass';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header />
      <main>
        <div className='content'>
          <RouterProvider router={router} />
        </div>
      </main>
      <footer>фывыфв</footer>
    </Provider>
  </React.StrictMode>
);
