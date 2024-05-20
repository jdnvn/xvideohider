chrome.storage.local.get(['threadsEnabled', 'timelineEnabled'], (settings) => {
  chrome.runtime.sendMessage({action: 'getUrl'}).then(response => {
    const { url } = response;

    const isThread = url.includes('status');
    const isTimeline = url.includes('home');

    // do not run if we are not on the timeline or a thread OR if user has setting turned off for either
    if (!(isThread || isTimeline) || (isThread && !settings.threadsEnabled) || (isTimeline && !settings.timelineEnabled)) {
      return;
    }
  
    const rootNode = document.getElementById('react-root');
    const config = { childList: true, subtree: true };
  
    // iteratively query for tweets as React DOM renders them
    const callback = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const tweets = document.querySelectorAll('article[data-testid="tweet"]');
  
          // delete all tweets with a video within a thread
          for (let i = isThread ? 1 : 0; i<tweets.length; i++) {
            const videoElement = tweets[i].querySelector('div[data-testid="videoComponent"]');
            if (videoElement) {
              tweets[i].remove();
            }
          }
        }
      }
    };
  
    const observer = new MutationObserver(callback);
    observer.observe(rootNode, config);
  });
});
