# IncognitoRegex

This extension allows you to configure Regular Expressions for websites that you want to always open in Incognito mode.

For example, if you always want to open your banking page in Incognito mode, you can use a regex like: .*(bank|banking).*

You can experiment with regex at: https://regexr.com/8ab88

## Notes

***this is some legacy code (~10years old), which I partially updated to comply with google chrome manifest V3.***

if you find a bug, please report it.

## How To Start Developing (contribution)

https://developer.chrome.com/docs/extensions/get-started

- goto Chrome/Edge/Brave Extensions page
- enable Developer mode
- click "load unpacked" to load local folder as chrome extension
- disable extension from app store (otherwise you have it twice)
- play arround
- click reload icon on dev extension


## TODOs
- this readme should be extended.
- merge extracted incognito tabs into existing incognito window.
- collect errors and display them in options dialog.
- make it faster.
- remove jQuery dependency.
