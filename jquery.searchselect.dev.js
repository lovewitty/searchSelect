/**
 * jQuery searchSelect Plugin
 *
 * Copyright (c) 2013 Odd Hill
 * http://oddhill.se
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
;(function($, window, document, undefined) {
  'use strict';

  // Creates new jQuery method searchSelect
  $.fn.searchSelect = function(options) {

    // Setting default settings values.
    var defaults = {
      emptyMessage: 'No results..',

      slimScrollWidth: 'none',
      slimScrollHeight: 'auto',
      slimScrollSize: '7px',
      slimScrollPosition: 'right',
      slimScrollColor: '#000000',
      slimScrollAlwaysVisible: false,
      slimScrollDistance: 0,
      slimScrollStart: 'top',
      slimScrollWheelStep: 20,
      slimScrollRailVisible: true,
      slimScrollRailColor: '#F0F0F0',
      slimScrollRailOpacity: 1,
      slimScrollAllowPageScroll: false,
      slimScrollDisableFadeOut: false,
      slimScrollTouchScrollStep: 200
    };

    // Overriding settings with the options sent as parameter.
    var settings = $.extend(defaults, options);

    // Looping through matched elements and returning them for chainability.
    // Adding new elements to put on top of matched elements.
    // Reading the size of matched element and creates an equally sized element.
    return this.each(function(i, obj) {
      var parse = parseInt($(this).css('margin-bottom'), 10);
      var button = $('<div class="searchSelectButton" style="' +
        'width:' + $(this).outerWidth() + 'px;' +
        'height:' + $(this).outerHeight() + 'px;' +
        'left:' + $(this).css('margin-left') + ';' +
        'bottom:' + ($(this).outerHeight() + ((isNaN(parse)) ? 0 : parse) + 'px;"></div>'));
      var layer = $('<div class="searchSelectLayer"></div>');
      var text = $('<input type="text" class="searchSelectButtonText"></input>');
      var drop = $('<div class="searchSelectDrop" style="' +
        'top:' + $(this).outerHeight() + 'px;"></div>');
      var options = $('<div class="searchSelectOptions"></div>');
      var option = $('<div class="searchSelectOption"></div>');
      var empty = $('<div class="searchSelectEmpty"><p class="searchSelectEmpty">' + settings.emptyMessage + '</p></div>');
      var p = $('<p class="searchSelectOptionText"></p>');

      // Looping through options in select and copy into new element.
      $(this).find('option').each(function(i, obj) {
        $(p).text($(this).text());
        $(option).attr('id', 'searchSelectOptionValue-' + $(this).val());
        $(option).append(p);
        $(options).append(option.clone());
        $(options).append(empty);
      });

      // Adding new elements after the select element.
      // Remove original select from tabindex.
      $(button).append(text);
      $(drop).append(options);
      $(button).append(drop);
      $(button).append(layer);
      $(this).after(button);
      $(this).attr('tabindex', '-1');

      // Setting default selected value.
      $('#searchSelectOptionValue-' + $(this).find(':selected').val()).addClass('searchSelectOptionSelected');

      // Adding scroll to the new dropdown element.
      $(this).siblings('.searchSelectButton').find('.searchSelectOptions').slimScroll({
        width: settings.slimScrollWidth,
        height: settings.slimScrollHeight,
        size: settings.slimScrollSize,
        position: settings.slimScrollPosition,
        color: settings.slimScrollColor,
        alwaysVisible: settings.slimScrollAlwaysVisible,
        distance: settings.slimScrollDistance,
        start: settings.slimScrollStart,
        wheelStep: settings.slimScrollWheelStep,
        railVisible: settings.slimScrollRailVisible,
        railColor: settings.slimScrollRailColor,
        railOpacity: settings.slimScrollRailOpacity,
        allowPageScroll: settings.slimScrollAllowPageScroll,
        disableFadeOut: settings.slimScrollDisableFadeOut,
        touchScrollStep: settings.slimScrollTouchScrollStep
      });
    });
  };

  // Creates a new jQuery contains selector that is case insensitive.
  $.expr[':'].searchSelectContains = $.expr.createPseudo(function(arg) {
    return function(elem) {
      return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
  });

  // Event handler for hiding dropdown when moving mouse outside of it.
  $(document).on('mouseleave.searchSelect', '.searchSelectDrop', function(ev) {
    $(this).hide().parents('.searchSelectButton').prev('select').val($(this).find('.searchSelectOptionSelected').attr('id').replace('searchSelectOptionValue-','')).change();
    $(this).siblings('.searchSelectButtonText').val('').blur();
  });

  // Event handler for showing dropdown when clicking on select button.
  $(document).on('click.searchSelect', '.searchSelectButton', function(ev) {
    $(this).find('.searchSelectDrop').show();
    $(this).prev('select').val('');
    $(this).find('.searchSelectButtonText').val('').focus();
    $(this).find('.searchSelectOption').show();
  });

  // Event handler for changing value of select when option is clicked.
  $(document).on('click.searchSelect', '.searchSelectOption', function(ev) {
    ev.stopPropagation();
    $(this).addClass('searchSelectOptionSelected').siblings().removeClass('searchSelectOptionSelected');
    $(this).parents('.searchSelectDrop').hide();
    $(this).parents('.searchSelectButton').find('.searchSelectButtonText').val('');
    $(this).parents('.searchSelectButton').prev('select').val($(this).attr('id').replace('searchSelectOptionValue-', '')).change();
  });

  // Event handler for searching through options when user types something.
  $(document).on('keyup.searchSelect', '.searchSelectButtonText', function(ev) {
    $(this).parents('.searchSelectButton').prev('select').val('');
    $(this).siblings('.searchSelectDrop').show().find('.searchSelectOption').hide();
    if($(this).siblings('.searchSelectDrop').find('.searchSelectOptionText:searchSelectContains("' + $(this).val() + '")').parent().show().length) {
      $('div.searchSelectEmpty').hide();
    }
    else {
      $('div.searchSelectEmpty').show();
    }
  });
}( jQuery, window, document ));
