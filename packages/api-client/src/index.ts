import { createApiClient } from './client';

export * from './client';

export interface BrowserApiClientOptions {
  baseUrl?: string;
  tokenStorageKey?: string;
}

const DEFAULT_BASE_URL = 'http://127.0.0.1:9000';
const DEFAULT_TOKEN_KEY = 'pinn_token';

function readStorageItem(key: string) {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(key);
}

function removeStorageItem(key: string) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(key);
}

export function createBrowserApiClient(options: BrowserApiClientOptions = {}) {
  const tokenKey = options.tokenStorageKey ?? DEFAULT_TOKEN_KEY;

  return createApiClient({
    baseUrl: options.baseUrl ?? DEFAULT_BASE_URL,
    getAccessToken: () => readStorageItem(tokenKey),
    onUnauthorized: async () => {
      removeStorageItem(tokenKey);
    },
  });
}

export const apiClient = createBrowserApiClient();
