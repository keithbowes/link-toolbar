if (window.hasRun) throw "Already run";
window.hasRun = true;

var linktoolbar = document.createElement('div');
linktoolbar.setAttribute('style', 'position: fixed; border: thin black solid; right: 0; z-index: 4000');
document.body.insertBefore(linktoolbar, document.body.firstChild);

try {
    var iconlink = document.querySelector('link[rel~=icon]');
    var elem = document.createElement('img');
    elem.setAttribute('alt', iconlink.title);
    elem.setAttribute('src', iconlink.href);
    linktoolbar.appendChild(elem);
} catch (e) {
}

try {
    var toplink = document.querySelector('link[rel=top]').href;
} catch (e) {
    var toplink = '/';
} finally {
    var tnode = document.createTextNode('Top');
    var elem = document.createElement('a');
    elem.setAttribute('href', toplink);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
}

try {
    var uplink = document.querySelector('link[rel=up]').href;
} catch (e) {
    var uplink = '../';
} finally {
    var tnode = document.createTextNode('Up');
    var elem = document.createElement('a');
    elem.setAttribute('href', uplink);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
}

try {
    var startlink = document.querySelector('link[rel=start]').href;
    var tnode = document.createTextNode('Start');
    var elem = document.createElement('a');
    elem.setAttribute('href', startlink);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

try {
    var firstlink = document.querySelector('link[rel=first]').href;
    var tnode = document.createTextNode('First');
    var elem = document.createElement('a');
    elem.setAttribute('href', firstlink);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

try {
    var prevlink = document.querySelector('link[rel=prev],link[rel=previous]').href;
    var tnode = document.createTextNode('Prev');
    var elem = document.createElement('a');
    elem.setAttribute('href', prevlink);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

try {
    var nextlink = document.querySelector('link[rel=next]').href;
    var tnode = document.createTextNode('Next');
    var elem = document.createElement('a');
    elem.setAttribute('href', nextlink);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

try {
    var lastlink = document.querySelector('link[rel=last]').href;
    var tnode = document.createTextNode('Last');
    var elem = document.createElement('a');
    elem.setAttribute('href', lastlink);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

var bookmarks = document.querySelectorAll('link[rel=bookmark]');
if (bookmarks.length > 0) {
    var bookmarks_combo = document.createElement('select');
    bookmarks_combo.setAttribute('onchange', "location.href=this.options[this.selectedIndex].value");
    var bookmarks_group = document.createElement('optgroup');
    bookmarks_group.setAttribute('label', 'Bookmarks');
    bookmarks_combo.appendChild(bookmarks_group);
    linktoolbar.appendChild(bookmarks_combo);
}
for (bookmark of bookmarks) {
    var tnode = document.createTextNode(bookmark.title || bookmark.rel);
    var elem  = document.createElement('option');
    elem.setAttribute('title', bookmark.href);
    elem.setAttribute('value', bookmark.href);
    elem.appendChild(tnode);
    bookmarks_combo.appendChild(elem);
}

var alternates = document.querySelectorAll('link[rel~=alternate]:not([rel~=stylesheet]');
if (alternates.length > 0) {
    var alternates_combo = document.createElement('select');
    alternates_combo.setAttribute('onchange', "location.href=this.options[this.selectedIndex].value");
    var alternates_group = document.createElement('optgroup');
    alternates_group.setAttribute('label', 'Alternate Versions');
    alternates_combo.appendChild(alternates_group);
    linktoolbar.appendChild(alternates_combo);
}
for (var alternate of alternates) {
    var tnode = document.createTextNode(alternate.title || alternate.rel);
    var elem  = document.createElement('option');
    elem.setAttribute('title', alternate.href);
    elem.setAttribute('value', alternate.href);
    elem.appendChild(tnode);
    alternates_combo.appendChild(elem);
}

var stylesheets = document.styleSheets;
var tstyles = document.querySelectorAll('link[rel~=stylesheet][title]');
if (tstyles.length > 0) {
    var styles_combo = document.createElement('select');
    styles_combo.setAttribute('onchange', "document.querySelector('link[rel~=stylesheet]:not([rel~=alternate])').href = this.options[this.selectedIndex].value");
    var styles_group = document.createElement('optgroup');
    styles_group.setAttribute('label', 'Available Stylesheets');
    styles_combo.appendChild(styles_group);
    linktoolbar.appendChild(styles_combo);
}

    for (var style of tstyles) {
        var tnode = document.createTextNode(style.title);
        var elem  = document.createElement('option');
        if (!/\balternate\b/.test(style.rel)) {
            elem.setAttribute('selected', 'selected');
        }
        elem.setAttribute('value', style.href);
        elem.appendChild(tnode);
        styles_combo.appendChild(elem);
    }

var notsel = '';
var rels=['stylesheet', 'alternate', 'icon', 'start', 'up', 'first', 'prev', 'previous', 'next', 'last', 'bookmark'];
for (var rel of rels) {
    notsel += ':not([rel~=' + rel + '])';
}
var otherlinks=document.querySelectorAll('link' + notsel)
if (otherlinks.length > 0) {
    var other_combo = document.createElement('select');
    other_combo.setAttribute('onchange', "location.href=this.options[this.selectedIndex].value");
    var other_group = document.createElement('optgroup');
    other_group.setAttribute('label', 'Other');
    other_combo.append(other_group);
    linktoolbar.appendChild(other_combo);
}
for (var otherlink of otherlinks) {
    var tnode = document.createTextNode(otherlink.title || otherlink.rel);
    var elem  = document.createElement('option');
    elem.setAttribute('title', otherlink.href);
    elem.setAttribute('value', otherlink.href);
    elem.appendChild(tnode);
    other_combo.appendChild(elem);
}
