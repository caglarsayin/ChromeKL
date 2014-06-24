chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if (changeInfo.status === 'complete') {
        chrome.tabs.executeScript(tabId, {
            allFrames: true, 
            file: 'src/inject/payload.js'
        });
    }
});

function onInit() {
  console.log('onInit');
  chrome.alarms.create('watchdog', {periodInMinutes:1});
}

function onAlarm(alarm) {
  console.log('Got alarm', alarm);
  // |alarm| can be undefined because onAlarm also gets called from
  // window.setTimeout on old chrome versions.
   onWatchdog();
}

function onWatchdog() {
  console.log('Watchdog alarm exists. Yay.');

}

//chrome.runtime.onInstalled.addListener(onInit);
chrome.alarms.onAlarm.addListener(onAlarm);