declare global {
  interface Window {
    pinnDesktop: {
      platform: 'electron';
      versions: {
        chrome: string;
        electron: string;
        node: string;
      };
    };
  }
}

export {};
