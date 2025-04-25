if (window.hasRun) throw "Already run";
window.hasRun = true;

var opacity = 1.0;
var position = 'static';
var zindex = 1;
for (var elem of document.querySelectorAll('*')) {
    var curStyle = document.defaultView.getComputedStyle(elem, null);
    if ((curStyle.getPropertyValue('position') == 'fixed') && curStyle.getPropertyValue('top') == '0px' && curStyle.getPropertyValue('z-index') != 'auto') {
        opacity = 0.75;
        position = 'fixed';
    }
    if (curStyle.getPropertyValue('z-index') != 'auto' && curStyle.getPropertyValue('z-index') >= zindex) {
        zindex = curStyle.getPropertyValue('z-index') + 1;
    }
}

var linktoolbar = document.createElement('div');
linktoolbar.setAttribute('style', 'position: ' + position + '; border: thin black solid; opacity: ' + opacity + '; right: 0; z-index: ' + zindex);
document.body.insertBefore(linktoolbar, document.body.firstChild);

try {
    var iconlink = document.querySelector('link[rel~=icon]');
    var elem = document.createElement('img');
    elem.setAttribute('alt', iconlink.title);
    elem.setAttribute('src', iconlink.href);
    elem.setAttribute('height', 16);
    elem.setAttribute('width', 16);
    linktoolbar.appendChild(elem);
    linktoolbar.appendChild(document.createTextNode(' '));
} catch (e) {
}

try {
    var homelink = document.querySelector('link[rel=home]').href;
} catch (e) {
    var homelink = '/';
} finally {
    var tnode = document.createTextNode('Top');
    var elem = document.createElement('a');
    elem.setAttribute('href', homelink);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
    linktoolbar.appendChild(document.createTextNode(' '));
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
    linktoolbar.appendChild(document.createTextNode(' '));
}

try {
    var startlink = document.querySelector('link[rel=start]').href;
    var tnode = document.createTextNode('Start');
    var elem = document.createElement('a');
    elem.setAttribute('href', startlink);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
    linktoolbar.appendChild(document.createTextNode(' '));
} catch (e) {
}

try {
    var firstlink = document.querySelector('link[rel=first]').href;
    var tnode = document.createTextNode('First');
    var elem = document.createElement('a');
    elem.setAttribute('href', firstlink);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
    linktoolbar.appendChild(document.createTextNode(' '));
} catch (e) {
}

/* 'previous' is an alias of 'prev' allowed in HTML 4 and older but only 'prev' is allowed in HTML 5. */
try {
    var prevlink = document.querySelector('link[rel=prev],link[rel=previous]').href;
    var tnode = document.createTextNode('Prev');
    var elem = document.createElement('a');
    elem.setAttribute('href', prevlink);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
    linktoolbar.appendChild(document.createTextNode(' '));
} catch (e) {
}

try {
    var nextlink = document.querySelector('link[rel=next]').href;
    var tnode = document.createTextNode('Next');
    var elem = document.createElement('a');
    elem.setAttribute('href', nextlink);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
    linktoolbar.appendChild(document.createTextNode(' '));
} catch (e) {
}

try {
    var lastlink = document.querySelector('link[rel=last]').href;
    var tnode = document.createTextNode('Last');
    var elem = document.createElement('a');
    elem.setAttribute('href', lastlink);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
    linktoolbar.appendChild(document.createTextNode(' '));
} catch (e) {
}

try {
    var authorlink = document.querySelector('link[rel=author]').href;
    var authortitle = document.querySelector('link[rel=author]').title;
} catch (e) {
    /* Eh, what Lynx does. It might not be the best thing to do. */
    var authorlink = 'mailto:webmaster@' + location.hostname;
    var authortitle = '*Author'; // Use an asterisk to indicate that it might not work.
} finally {
    var tnode = document.createTextNode(authortitle || 'Author');
    var elem = document.createElement('a');
    elem.setAttribute('href', authorlink);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
    linktoolbar.appendChild(document.createTextNode(' '));
}

/* Note: rel="bookmark" for <link> was removed from HTML 5 but it still can be
 * used for <a> and <area> to specify a permalink. */
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
    linktoolbar.appendChild(document.createTextNode(' '));
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
    linktoolbar.appendChild(document.createTextNode(' '));
}
for (var alternate of alternates) {
    var title = alternate.title || alternate.rel;
    if (alternate.hreflang)
        title += ' [' + alternate.hreflang + ']';
    var tnode = document.createTextNode(title);
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
    linktoolbar.appendChild(document.createTextNode(' '));

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
var rels=['help'];
rels = rels.concat(['contents', 'index', 'glossary', 'copyright', 'chapter', 'section', 'subsection', 'appendix']); // Removed in HTML 5
rels = rels.concat(['license', 'search']); // Added in HTML 5; there's also 'dns-prefetch', 'icon', 'pingback', 'preconnect', 'prefetch', 'preload', and 'prerender', but those aren't interesting to a user but only to a browser or other user agent.
for (var rel of rels) {
    linksel.push('link[rel~=' + rel + ']');
}
otherlinks = document.querySelectorAll(linksel.join(', '));
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
