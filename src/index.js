import React from 'react';
import ReactDOM from 'react-dom/client';

// Fonts first, then the design system, then page styles — site.css overrides
// the design system in places, so its order matters.
import './styles/fonts.css';
import './styles/organic.css';
import './styles/site.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
