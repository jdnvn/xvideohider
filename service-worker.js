// hack for content script to access current tab url
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getUrl') sendResponse({ url: sender.tab.url });
});
