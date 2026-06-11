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
    <div className="min-h-[640px] w-[420px] max-w-[100vw] overflow-hidden rounded-[28px]">
      <PinnApp platform="extension" />
    </div>
  </StrictMode>,
);
