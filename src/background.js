(function (window, undefined) {
		
		function isIncognito(tab){
			return chrome.extension.inIncognitoContext;
		}
		function testRegex(regex, options, url) {
			try{
				var re = new RegExp(regex, options);
				return url.match(re);
			}
			catch (e)
			{
				return false;
			}
		}

		function isListed(url, tab){
			if(
			url.indexOf('chrome:') == 0 ||
			url.indexOf('chromium:') == 0 ||
			url.indexOf('chrome-extension:') == 0
			)
				return false;
				
			if(tab.incognito)
				return false;
				
			for (var i = 0; i < localStorage.length; i++) {
				var id = localStorage.key(i);
				var aListing = localStorage.getItem(id);
				var regex = aListing;
				if (testRegex(regex, "i", url)) {
					chrome.tabs.remove(tab.id);
					chrome.history.deleteUrl({url: url});
					chrome.windows.create({incognito: true, url: url});
					return true;
				}
			}
			return false;
		}
		
		chrome.tabs.onCreated.addListener(function(tab) {
			if(tab.url != undefined)
				isListed(tab.url, tab);
		});
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
			if (changeInfo.url != undefined) {
				isListed(changeInfo.url, tab);
			}
		});
		chrome.tabs.onSelectionChanged.addListener(function(tab) {
				if(tab.url != undefined)
					isListed(tab.url, tab);
		});
		chrome.windows.onCreated.addListener(function(tab) {
			if (tab.url != undefined) {
				isListed(tab.url, tab);
			}
		});
	})(window);