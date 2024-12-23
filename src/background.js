chrome.runtime.onInstalled.addListener(() => {
	chrome.tabs.onCreated.addListener((tab) => {
	  if (tab.url !== undefined) isListed(tab.url, tab);
	});
  
	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	  if (changeInfo.url !== undefined) {
		isListed(changeInfo.url, tab);
	  }
	});
  
	chrome.tabs.onActivated.addListener((activeInfo) => {
	  chrome.tabs.get(activeInfo.tabId, (tab) => {
		if (tab.url !== undefined) isListed(tab.url, tab);
	  });
	});
  
	chrome.windows.onCreated.addListener((window) => {
	  chrome.tabs.query({ windowId: window.id }, (tabs) => {
		tabs.forEach((tab) => {
		  if (tab.url !== undefined) isListed(tab.url, tab);
		});
	  });
	});
  });
  
  function isIncognito(tab) {
	return chrome.extension.inIncognitoContext;
  }
  
  function testRegex(regex, url) {
	try {
	  var re = new RegExp(regex, 'i');
	  return url.match(re);
	} catch (e) {
	  return false;
	}
  }
  
  function isListed(url, tab) {
	if (
	  url.indexOf('chrome:') === 0 ||
	  url.indexOf('chromium:') === 0 ||
	  url.indexOf('chrome-extension:') === 0
	)
	  return false;
  
	if (tab.incognito) return false;
  
	chrome.storage.local.get(null, (items) => {
	  for (var id in items) {
		var regex = items[id];
		if (testRegex(regex, url)) {
		  chrome.tabs.remove(tab.id);
		  chrome.history.deleteUrl({ url: url });
		  chrome.windows.create({ incognito: true, url: url });
		  return true;
		}
	  }
	});
  
	return false;
  }