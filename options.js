function applySetting(e) {
    chrome.storage.local.set({lt_type:  { value: e.target.value }});
}
document.forms.lt_type.addEventListener('change', applySetting);
chrome.storage.local.get("lt_type").then((item) => { document.querySelector('input[value=' + item.lt_type.value + ']').click(); }, (error) => { });
