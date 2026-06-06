import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { PinnApp } from '@pinn/pages';
import '@pinn/pages/styles.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element #root was not found.');
}

createRoot(container).render(
  <StrictMode>
    <div className="w-100">
      <PinnApp platform="extension" />
    </div>
  </StrictMode>,
);
