import React from 'react';
import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './store';
import {HelmetProvider} from "react-helmet-async";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <HelmetProvider>
      <Provider store={store}>
          <PayPalScriptProvider deferLoading={true} >
              <App />
          </PayPalScriptProvider>

      </Provider>
      </HelmetProvider>
  </React.StrictMode>
);


