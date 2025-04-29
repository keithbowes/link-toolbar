function applySetting(e) {
    chrome.storage.local.set({lt_type:  { value: e.target.value }});
}
document.getElementById('lt-fixed-label').appendChild(document.createTextNode(chrome.i18n.getMessage('extension_option_fixed')));
document.getElementById('lt-static-label').appendChild(document.createTextNode(chrome.i18n.getMessage('extension_option_static')));
document.getElementById('lt-toolbar-label').appendChild(document.createTextNode(chrome.i18n.getMessage('extension_option_toolbar')));
document.forms.lt_type.addEventListener('change', applySetting);
chrome.storage.local.get("lt_type").then((item) => { document.querySelector('input[value=' + item.lt_type.value + ']').click(); }, (error) => { });
