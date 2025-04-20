if (window.hasRun) throw "Already run";
window.hasRun = true;

var linktoolbar = document.createElement('div');
linktoolbar.setAttribute('style', 'position: fixed; border: thin black solid; opacity: 0.75; right: 0; z-index: 4000');
document.body.insertBefore(linktoolbar, document.body.firstChild);

try {
    var iconlink = document.querySelector('link[rel~=icon]');
    var elem = document.createElement('img');
    elem.setAttribute('alt', iconlink.title);
    elem.setAttribute('src', iconlink.href);
    elem.setAttribute('height', 16);
    elem.setAttribute('width', 16);
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

/* Note: Bookmarks were removed from HTML 5 */
var bookmarks = document.querySelectorAll('link[rel=bookmark]');
if (bookmarks.length > 0) {
    var bookmarks_combo = document.createElement('select');
    bookmarks_combo.setAttribute('onchange', "location.href=this.options[this.selectedIndex].value; this.options[0].disabled=true");
    var elem = document.createElement('option');
    elem.setAttribute('value', '');
    var tnode = document.createTextNode('Bookmarks');
    elem.appendChild(tnode);
    bookmarks_combo.appendChild(elem);
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
    alternates_combo.setAttribute('onchange', "location.href=this.options[this.selectedIndex].value; this.options[0].disabled=true");
    var elem = document.createElement('option');
    elem.setAttribute('value', '');
    var tnode = document.createTextNode('Alternate Versions');
    elem.appendChild(tnode);
    alternates_combo.appendChild(elem);
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

var tstyles = document.querySelectorAll('link[rel~=stylesheet][title]');
if (tstyles.length > 1) {
    var styles_combo = document.createElement('select');
    styles_combo.setAttribute('onchange', "document.querySelector('link[rel~=stylesheet]:not([rel~=alternate])').href = this.options[this.selectedIndex].value");
    var styles_group = document.createElement('optgroup');
    styles_group.setAttribute('label', 'Available Stylesheets');
    styles_combo.appendChild(styles_group);
    linktoolbar.appendChild(styles_combo);

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
}

var linksel = new Array();;
/* Any valid rel types not previously handled */
var rels=['author', 'help'];
rels = rels.concat(['contents', 'index', 'glossary', 'copyright', 'chapter', 'section', 'subsection', 'appendix']); // HTML 4 only
rels = rels.concat(['icon', 'license', 'search']); // HTML 5 only; there's also 'dns-prefetch', 'pingback', 'preconnect', 'prefetch', 'preload', and 'prerender', but those aren't interesting to a user but only to a browser or other user agent.
for (var rel of rels) {
    linksel.push('link[rel~=' + rel + ']');
}
linktoolbar.appendChild(document.createTextNode(linksel.join(', ')));
if (otherlinks.length > 0) {
    var other_combo = document.createElement('select');
    other_combo.setAttribute('onchange', "location.href=this.options[this.selectedIndex].value; this.options[0].disabled=true");
    var elem = document.createElement('option');
    elem.setAttribute('value', '');
    var tnode = document.createTextNode('Other');
    elem.appendChild(tnode);
    other_combo.append(elem);
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
