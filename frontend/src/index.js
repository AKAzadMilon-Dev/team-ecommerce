import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StoreProvider><HelmetProvider><App /></HelmetProvider></StoreProvider>);


