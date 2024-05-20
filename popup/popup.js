const toggleThreadsButton = document.getElementById('threads-toggle');
const toggleTimelineButton = document.getElementById('timeline-toggle');

// fetch config values from local storage
chrome.storage.local.get(['threadsEnabled', 'timelineEnabled'], (result) => {
  toggleThreadsButton.checked = !!result.threadsEnabled;
  toggleTimelineButton.checked = !!result.timelineEnabled;
  isInitializing = false;
});

// add event listeners for both toggles
toggleThreadsButton.addEventListener('change', () => {
  chrome.storage.local.get('threadsEnabled', (result) => {
    const newStatus = !result.threadsEnabled;
    chrome.storage.local.set({ threadsEnabled: newStatus }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let currentTab = tabs[0];
        toggleThreadsButton.checked = newStatus;
        if (currentTab?.url?.includes('status')) chrome.tabs.reload();
      });
    });
  });
});

toggleTimelineButton.addEventListener('change', () => {
  chrome.storage.local.get('timelineEnabled', (result) => {
    const newStatus = !result.timelineEnabled;
    chrome.storage.local.set({ timelineEnabled: newStatus }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let currentTab = tabs[0];
        toggleTimelineButton.checked = newStatus;
        if (currentTab?.url?.includes('home')) chrome.tabs.reload();
      });
    });
  });
});
