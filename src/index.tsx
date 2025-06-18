import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     {/* SVG filters MUST be globally available */}
    <svg style={{ display: 'none' }}>
      <filter id="deuteranopia">
        <feColorMatrix type="matrix"
          values="0.625 0.375 0 0 0
                  0.7   0.3   0 0 0
                  0     0.3   0.7 0 0
                  0     0     0   1 0" />
      </filter>
      <filter id="protanopia">
        <feColorMatrix type="matrix"
          values="0.567 0.433 0     0 0
                  0.558 0.442 0     0 0
                  0     0.242 0.758 0 0
                  0     0     0     1 0" />
      </filter>
      <filter id="tritanopia">
        <feColorMatrix type="matrix"
          values="0.95 0.05  0     0 0
                  0     0.433 0.567 0 0
                  0     0.475 0.525 0 0
                  0     0     0     1 0" />
      </filter>
    </svg>

    <App />
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
