import React from 'react';
import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './store';
import {HelmetProvider} from "react-helmet-async";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <HelmetProvider>
      <Provider store={store}>
          <App />
      </Provider>
      </HelmetProvider>
  </React.StrictMode>
);


