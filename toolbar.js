if (window.hasRun) throw "Already run";
window.hasRun = true;


function addLinkToolbar(options)
{
var toolbar_type;
try {
    toolbar_type = options.lt_type.value;
} catch (e) {
    toolbar_type = 'toolbar';
}

var position = 'fixed';
var root_element = document.body;
var zindex = 1;
if (toolbar_type != 'toolbar') {
    for (var elem of document.querySelectorAll('*')) {
        var curStyle = document.defaultView.getComputedStyle(elem, null);
        if (toolbar_type == 'static') {
            position = 'static';
            if ((curStyle.getPropertyValue('position') == 'fixed') && curStyle.getPropertyValue('top') == '0px') {
                root_element = elem;
            }
        }
        if (curStyle.getPropertyValue('z-index') != 'auto' && curStyle.getPropertyValue('z-index') >= zindex) {
            zindex = curStyle.getPropertyValue('z-index') + 1;
        }
    }
}

var toolbar_style = 'position: ' + position + ';border: thin black solid; z-index: ' + zindex;
if (toolbar_type == 'fixed') {
    toolbar_style += '; bottom: 0; right: 0';
    toolbar_style += '; opacity: 0.75';
    toolbar_style += '; text-wrap: nowrap; overflow: hidden';
    document.body.style.marginBottom = '2em';
}
else if (toolbar_type == 'toolbar') {
    toolbar_style += '; left: 0; top: 0; width: 100%';
}

var linktoolbar = document.createElement('div');
linktoolbar.setAttribute('id', 'link-toolbar');
linktoolbar.setAttribute('style', toolbar_style);
root_element.insertBefore(linktoolbar, root_element.firstChild);

if (toolbar_type == 'toolbar') {
    document.getElementById('link-toolbar').style.top = '0';
    if (document.defaultView.getComputedStyle(document.body, null).getPropertyValue('position') == 'static')
        document.body.style.position = 'relative';
}

try {
    var toplink = document.querySelector('link[rel=top]');
    if (!toplink) {
        throw "No top link";
    }
} catch (e) {
    var toplink = document.createElement('link');
} finally {
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_top'));
    var elem = document.createElement('a');
    elem.setAttribute('href', toplink.href || '/');
    elem.setAttribute('title', toplink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
}

try {
    var uplink = document.querySelector('link[rel=up]');
    if (!uplink) {
        throw "No up link";
    }
} catch (e) {
    var uplink = document.createElement('link');
} finally {
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_up'));
    var elem = document.createElement('a');
    elem.setAttribute('href', uplink.href || '../');
    elem.setAttribute('title', uplink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
}

try {
    var startlink = document.querySelector('link[rel=start]');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_start'));
    var elem = document.createElement('a');
    elem.setAttribute('href', startlink.href);
    elem.setAttribute('title', startlink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

try {
    var firstlink = document.querySelector('link[rel=first]');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_first'));
    var elem = document.createElement('a');
    elem.setAttribute('href', firstlink.href);
    elem.setAttribute('title', firstlink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

/* 'previous' is an alias of 'prev' allowed in HTML 4 and older but only 'prev' is allowed in HTML 5. */
try {
    var prevlink = document.querySelector('link[rel=prev],link[rel=previous]');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_prev'));
    var elem = document.createElement('a');
    elem.setAttribute('href', prevlink.href);
    elem.setAttribute('title', prevlink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

try {
    var nextlink = document.querySelector('link[rel=next]');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_next'));
    var elem = document.createElement('a');
    elem.setAttribute('href', nextlink.href);
    elem.setAttribute('title', nextlink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

try {
    var lastlink = document.querySelector('link[rel=last]');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_last'));
    var elem = document.createElement('a');
    elem.setAttribute('href', lastlink.href);
    elem.setAttribute('title', lastlink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

var tstyles = document.querySelectorAll('link[rel~=stylesheet][title]');
if (tstyles.length > 1) {
    var styles_combo = document.createElement('select');
    styles_combo.setAttribute('onchange', "document.querySelector('link[rel~=stylesheet]:not([rel~=alternate])').href = this.options[this.selectedIndex].value");
    var styles_group = document.createElement('optgroup');
    styles_group.setAttribute('label', chrome.i18n.getMessage('extension_item_available_stylesheets'));
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

/* rev="made" was an older, nonstandard attribute still used in some older documents. Newer documents should use the standard rel="author". */
try {
    var authorlink = document.querySelector('link[rel=author],link[rev=made]');
    var authorlink_address = authorlink.href;
    var authorlink_title_prefix = '';
} catch (e) {
    var authorlink = document.createElement('link');
    /* Eh, what Lynx does. It might not be the best thing to do. */
    var authorlink_address = 'mailto:webmaster@' + location.hostname;
    var authorlink_title_prefix = '*';
} finally {
    var tnode = document.createTextNode(authorlink_title_prefix + chrome.i18n.getMessage('extension_item_author'));
    var elem = document.createElement('a');
    elem.setAttribute('href', authorlink_address);
    elem.setAttribute('title', authorlink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
}

try {
    var homelink = document.querySelector('link[rel=home]');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_home'));
    var elem = document.createElement('a');
    elem.setAttribute('href', homelink.href);
    elem.setAttribute('title', homelink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

try {
    var helplink = document.querySelector('link[rel=help]');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_help'));
    var elem = document.createElement('a');
    elem.setAttribute('href', helplink.href);
    elem.setAttribute('title', helplink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

try {
    var contentslink = document.querySelector('link[rel=contents]');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_contents'));
    var elem = document.createElement('a');
    elem.setAttribute('href', contentslink.href);
    elem.setAttribute('title', contentslink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

try {
    var indexlink = document.querySelector('link[rel=index]');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_index'));
    var elem = document.createElement('a');
    elem.setAttribute('href', indexlink.href);
    elem.setAttribute('title', indexlink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

try {
    var glossarylink = document.querySelector('link[rel=glossary]');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_glossary'));
    var elem = document.createElement('a');
    elem.setAttribute('href', glossarylink.href);
    elem.setAttribute('title', glossarylink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

/* rel="copyright" became rel="license" in HTML 5. */
try {
    var copyrightlink = document.querySelector('link[rel=copyright], link[rel=license]');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_copyright'));
    var elem = document.createElement('a');
    elem.setAttribute('href', copyrightlink.href);
    elem.setAttribute('title', copyrightlink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

try {
    var searchlink = document.querySelector('link[rel=search]');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_search'));
    var elem = document.createElement('a');
    elem.setAttribute('href', searchlink.href);
    elem.setAttribute('title', searchlink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

var alternates = document.querySelectorAll('link[rel~=alternate]:not([rel~=stylesheet]');
if (alternates.length > 0) {
    var alternates_combo = document.createElement('select');
    alternates_combo.setAttribute('onchange', "location.href=this.options[this.selectedIndex].value; this.options[0].disabled=true");
    var elem = document.createElement('option');
    elem.setAttribute('value', '');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_alternate_versions'));
    elem.appendChild(tnode);
    alternates_combo.appendChild(elem);
    linktoolbar.appendChild(alternates_combo);
}
for (var alternate of alternates) {
    var title = alternate.title || alternate.rel;
    /* The type attribute should allow the user to know whether the alternate
     * version is a feed. */
    if (alternate.type)
        title += ' (' + alternate.type + ')';
    /* And the language of the alternate version. */
    if (alternate.hreflang)
        title += ' [' + alternate.hreflang + ']';
    var tnode = document.createTextNode(title);
    var elem  = document.createElement('option');
    elem.setAttribute('title', alternate.href);
    elem.setAttribute('value', alternate.href);
    elem.appendChild(tnode);
    alternates_combo.appendChild(elem);
}

/* Note: rel="bookmark" for <link> was removed from HTML 5 but it still can be
 * used for <a> and <area> to specify a permalink. */
var bookmarks = document.querySelectorAll('link[rel=bookmark]');
if (bookmarks.length > 0) {
    var bookmarks_combo = document.createElement('select');
    bookmarks_combo.setAttribute('onchange', "location.href=this.options[this.selectedIndex].value; this.options[0].disabled=true");
    var elem = document.createElement('option');
    elem.setAttribute('value', '');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_bookmarks'));
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

/* Note: Chapters were removed from HTML 5. */
var chapters = document.querySelectorAll('link[rel=chapter]');
if (chapters.length > 0) {
    var chapters_combo = document.createElement('select');
    chapters_combo.setAttribute('onchange', "location.href=this.options[this.selectedIndex].value; this.options[0].disabled=true");
    var elem = document.createElement('option');
    elem.setAttribute('value', '');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_chapters'));
    elem.appendChild(tnode);
    chapters_combo.appendChild(elem);
    linktoolbar.appendChild(chapters_combo);
}
for (chapter of chapters) {
    var tnode = document.createTextNode(chapter.title || chapter.rel);
    var elem  = document.createElement('option');
    elem.setAttribute('title', chapter.href);
    elem.setAttribute('value', chapter.href);
    elem.appendChild(tnode);
    chapter_combo.appendChild(elem);
}

/* Note: Sections were removed from HTML 5. */
var sections = document.querySelectorAll('link[rel=section]');
if (sections.length > 0) {
    var sections_combo = document.createElement('select');
    sections_combo.setAttribute('onchange', "location.href=this.options[this.selectedIndex].value; this.options[0].disabled=true");
    var elem = document.createElement('option');
    elem.setAttribute('value', '');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_sections'));
    elem.appendChild(tnode);
    sections_combo.appendChild(elem);
    linktoolbar.appendChild(sections_combo);
}
for (section of sections) {
    var tnode = document.createTextNode(section.title || section.rel);
    var elem  = document.createElement('option');
    elem.setAttribute('title', section.href);
    elem.setAttribute('value', section.href);
    elem.appendChild(tnode);
    section_combo.appendChild(elem);
}

/* Note: Subsections were removed from HTML 5. */
var subsections = document.querySelectorAll('link[rel=subsection]');
if (subsections.length > 0) {
    var subsections_combo = document.createElement('select');
    subsections_combo.setAttribute('onchange', "location.href=this.options[this.selectedIndex].value; this.options[0].disabled=true");
    var elem = document.createElement('option');
    elem.setAttribute('value', '');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_subsections'));
    elem.appendChild(tnode);
    subsections_combo.appendChild(elem);
    linktoolbar.appendChild(subsections_combo);
}
for (subsection of subsections) {
    var tnode = document.createTextNode(subsection.title || subsection.rel);
    var elem  = document.createElement('option');
    elem.setAttribute('title', subsection.href);
    elem.setAttribute('value', subsection.href);
    elem.appendChild(tnode);
    subsection_combo.appendChild(elem);
}

/* Note: Appendices were removed from HTML 5. */
var appendices = document.querySelectorAll('link[rel=appedix]');
if (appendices.length > 0) {
    var appendices_combo = document.createElement('select');
    appendices_combo.setAttribute('onchange', "location.href=this.options[this.selectedIndex].value; this.options[0].disabled=true");
    var elem = document.createElement('option');
    elem.setAttribute('value', '');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_appendices'));
    elem.appendChild(tnode);
    appendices_combo.appendChild(elem);
    linktoolbar.appendChild(appendices_combo);
}
for (appendix of appendices) {
    var tnode = document.createTextNode(appendix.title || appendix.rel);
    var elem  = document.createElement('option');
    elem.setAttribute('title', appendix.href);
    elem.setAttribute('value', appendix.href);
    elem.appendChild(tnode);
    appendices_combo.appendChild(elem);
}

try {
    var canonicallink = document.querySelector('link[rel=canonical]');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_canonical'));
    var elem = document.createElement('a');
    elem.setAttribute('href', canonicallink.href);
    elem.setAttribute('title', canonicallink.title);
    elem.appendChild(tnode);
    linktoolbar.appendChild(elem);
} catch (e) {
}

var handled_link_types = ['alternate', 'appendix', 'author', 'bookmark', 'canonical', 'chapter', 'contents', 'copyright', 'first', 'glossary', 'help', 'home', 'icon', 'index', 'last', 'license', 'next', 'prev', 'previous', 'search', 'section', 'start', 'stylesheet', 'subsection', 'top', 'up'];
var notsel = '';
for (var handled_link_type of handled_link_types) {
    notsel += ':not([rel~=' + handled_link_type + '])';
}

otherlinks = document.querySelectorAll('link' + notsel);
if (otherlinks.length > 0) {
    var other_combo = document.createElement('select');
    other_combo.setAttribute('onchange', "location.href=this.options[this.selectedIndex].value; this.options[0].disabled=true");
    var elem = document.createElement('option');
    elem.setAttribute('value', '');
    var tnode = document.createTextNode(chrome.i18n.getMessage('extension_item_other'));
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

var tbstyle = document.createElement('link');
tbstyle.rel = 'stylesheet';
tbstyle.href = chrome.runtime.getURL("toolbar.css");
document.head.appendChild(tbstyle);

if (toolbar_type == 'toolbar') {
    var ltheight = document.defaultView.getComputedStyle(document.getElementById('link-toolbar'), null).getPropertyValue('height');
    document.body.style.top =  ltheight;
    for (var elem of document.querySelectorAll('*:not([id=link-toolbar])')) {
        var curStyle = document.defaultView.getComputedStyle(elem, null);
        if ((curStyle.getPropertyValue('position') == 'absolute' || curStyle.getPropertyValue('position') == 'fixed') && curStyle.getPropertyValue('top') == '0px') {
            elem.style.top = ltheight;
        }
        if (curStyle.getPropertyValue('z-index') != 'auto' && curStyle.getPropertyValue('z-index') >= zindex) {
            zindex = curStyle.getPropertyValue('z-index') + 1;
        }
    }
    document.getElementById('link-toolbar').style.zIndex = zindex;
}
}

chrome.storage.local.get().then(addLinkToolbar, (error) => { });
