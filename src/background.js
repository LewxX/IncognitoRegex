chrome.tabs.onCreated.addListener((tab) => {
	if (tab.url !== undefined) checkRegexList(tab.url, tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.url !== undefined) {
		checkRegexList(tab.url, tab);
	}
});

chrome.tabs.onActivated.addListener((activeInfo) => {
	chrome.tabs.get(activeInfo.tabId, (tab) => {
		console.log('onActivated', tab.url);
		if (tab.url !== undefined) checkRegexList(tab.url, tab);
	});
});

chrome.windows.onCreated.addListener((window) => {
	chrome.tabs.query({ windowId: window.id }, (tabs) => {
		tabs.forEach((tab) => {
			console.log('onCreated', tab.url);
			if (tab.url !== undefined) checkRegexList(tab.url, tab);
		});
	});
});


function testRegex(regex, url) {
	try {
		var re = new RegExp(regex, 'i');
		return url.match(re);
	} catch (e) {
		console.warn(`Failed to test Regex: '${regex}' for url: '${url}'`, e);
		return false;
	}
}

function checkRegexList(url, tab, retryCount = 0) {
	if (
		url.indexOf('chrome:') === 0 ||
		url.indexOf('chromium:') === 0 ||
		url.indexOf('chrome-extension:') === 0
	)
		return false;

	if (tab.incognito) return false;

	chrome.storage.sync.get(null, async (items) => {
		for (var id in items) {
			var regex = items[id];
			if (testRegex(regex, url)) {
				try {
					await chrome.tabs.remove(tab.id);
					await chrome.history.deleteUrl({ url: url });
					await chrome.windows.create({ incognito: true, url: url });
				} catch (error) {
					if (retryCount < 5) {
						console.warn('Failed to handle tab, retrying:', retryCount, error);
						setTimeout(() => checkRegexList(url, tab, retryCount + 1), 1000);
					} else {
						console.error('Failed to handle tab after multiple retries:', error);
					}
				}
				return true;
			}
		}
	});

	return false;
}