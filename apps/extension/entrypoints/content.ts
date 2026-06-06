export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    console.log('Pinn content script ready.');

    browser.runtime.onMessage.addListener((message) => {
      if (message?.type !== 'pinn:get-selection') {
        return undefined;
      }

      const selection = window.getSelection()?.toString().trim() ?? '';
      return Promise.resolve({
        selection,
        title: document.title,
        url: window.location.href,
      });
    });

    return undefined;
  },
});
