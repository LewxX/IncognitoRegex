# IncognitoRegex

This extension allows you to configure Regular Expressions for websites that you want to always open in Incognito mode.

For example, if you always want to open your banking page in Incognito mode, you can use a regex like: .*(bank|banking).*

You can experiment with regex at: https://regexr.com/8ab88

## How To Start Developing

https://developer.chrome.com/docs/extensions/get-started

- goto Chrome/Edge/Brave Extensions page
- enable Developer mode
- click "load unpacked" to load local folder as chrome extension
- disable extension from app store (otherwise you have it twice)
- play arround
- click reload icon on dev extension


### TODOs
- this needs to be ported to "manifest_version": 3
    - https://developer.chrome.com/docs/extensions/develop/migrate
- also it may need some hierarchy stucture (e.g. images in a seperate folder)
- this readme should be extended
