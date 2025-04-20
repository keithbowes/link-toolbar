# link-toolbar
A WebExtensions addon implementing [the LINK element](https://gutfeldt.ch/matthias/translation/LINK/ENaddendum.html). There was the [Link Widgets](https://web.archive.org/web/20181102194011/https://addons.mozilla.org/en-US/firefox/addon/link-widgets/) XUL extension for Firefox but it seems not to have been ported to WebExtensions.

## Installation

Not currently available as an installer, but it can be installed by cloning the repository and then loading the extension manually.

### Firefox

Go to <about:debugging>, click on "This Firefox", and then use the "Lead temporary add-on" to locate the manifest.json.

### Chromium

Go to the <chrome://extensions/>, turn on developer mode, and then use "Unpacked Extensions" to locate the directory containing the extension.

## TODO

- [ ] Translation framework.
- [ ] Options page to indicate how the user wishes the toolbar to be displayed. 
- [ ] Change the icon at runtime to indicate the status of whether alternate stylesheets and/or links are available for a page.
- [ ] Populate the popup page with the information available as the link toolbar.
- [ ] Allow users to disable to disable the link toolbar and just use the browser's toolbar icon if they find the link toolbar too intrusive (it shouldn't be on most pages, but pages that use explicit positioning can cause problems).
- [ ] Provide it in the Firefox and Chrome web stores.
