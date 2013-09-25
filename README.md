# searchSelect

jQuery plugin for searchable and scrollable select lists while keeping default button style.


## Documentation

To make your select lists searchable and scrollable, run the plugin on any html select element.

### Dependencies

* jQuery 1.7+ (included)
* slimScroll 1.3+ (included)

### Installation

```html
// Include css
<link rel="stylesheet" href="jquery.searchselect.css">
// Include scripts
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="slimscroll.min.js"></script>
<script type="text/javascript" src="searchselect.min.js"></script>
```

### How to use

```javascript
// Initialize plugin to all selects
$('select').searchselect();

// Initialize plugin to select with id foo
$('select#foo').searchselect();

// Initialize plugin to selects with class foo with custom settings
$('select.foo').searchselect({emptyMessage: 'No options found..'})
```

### Options

* **emptyMessage:** Text to display when result is empty. **Default:** 'No results..'

* **slimScrollWidth:** Width of visible scroll area. Stretch to parent if not set. **Default:** 'none',
* **slimScrollHeight:** Height of visible scroll area. Supports auto for parent size. **Default:** 'auto',
* **slimScrollSize:** Width of scrollbar. **Default:** '7px',
* **slimScrollPosition:** Sets the position of scrollbar. **Default:** 'right',
* **slimScrollColor:** Color of scrollbar. **Default:** '#000000',
* **slimScrollAlwaysVisible:** Disables scrollbar hide. **Default:** false,
* **slimScrollDistance:** Distance from parent element. Used with position property. **Default:** 0,
* **slimScrollStart:** Initial position of scrollbar: top, bottom, $(element). **Default:** 'top',
* **slimScrollWheelStep:** Integer value for mouse wheel delta. **Default:** 20,
* **slimScrollRailVisible:** Enables scrollbar rail. **Default:** true,
* **slimScrollRailColor:** Sets scrollbar rail color. **Default:** '#F0F0F0',
* **slimScrollRailOpacity:** Sets scrollbar rail opacity. **Default:** 1,
* **slimScrollAllowPageScroll:** Scroll page when bar reaches top or bottom. **Default:** false,
* **slimScrollDisableFadeOut:** Disables scrollbar auto fade. **Default:** false,
* **slimScrollTouchScrollStep:** Sensitivity for touch scroll events. **Default:** 200


## License

This plugin is released under the MIT license.
[More Information](http://opensource.org/licenses/MIT)


## Download

Releases are available for download from
[GitHub](http://oddhill.github.io/searchSelect/).



******

Development is sponsored by [Odd Hill](http://oddhill.se)
