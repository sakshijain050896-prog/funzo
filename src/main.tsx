import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initMobileApp } from './lib/mobileApp';
import { runOneTimeStatsReset } from './lib/storage';

// Initialize Capacitor Native & PWA capabilities
initMobileApp();

// One-time reset of Won/Played counters inflated by old bugs (must run before App reads stats)
runOneTimeStatsReset();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
