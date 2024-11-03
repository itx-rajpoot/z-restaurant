import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import AddCartContext from './context/AddCartContext';

import CartContextProvider from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        {/* <AddCartContext> */}
        <CartContextProvider>

        <App />
        </CartContextProvider>
        {/* </AddCartContext> */}
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
