import React from 'react';
import ReactDOM from 'react-dom/client';

// Custom component
import Weather from './Component/Weather';

// CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Weather />
  </React.StrictMode>
);