import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './UserContext';
import store from './Redux/redux-store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/teamify-front">
    <Provider store ={store}>
      <App />
    </Provider>
  </BrowserRouter>
);


reportWebVitals();
