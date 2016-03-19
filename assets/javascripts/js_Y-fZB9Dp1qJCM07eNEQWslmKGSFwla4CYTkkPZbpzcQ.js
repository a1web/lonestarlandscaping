// $Id: html5.js,v 1.1 2010/10/05 23:53:50 spaceninja Exp $
// html5shiv MIT @rem remysharp.com/html5-enabling-script
// iepp v1.5.1 MIT @jon_neal iecss.com/print-protector
/*@cc_on@if(@_jscript_version<9)(function(p,e){function q(a,b){if(g[a])g[a].styleSheet.cssText+=b;else{var c=r[l],d=e[j]("style");d.media=a;c.insertBefore(d,c[l]);g[a]=d;q(a,b)}}function s(a,b){for(var c=new RegExp("\\b("+m+")\\b(?!.*[;}])","gi"),d=function(k){return".iepp_"+k},h=-1;++h<a.length;){b=a[h].media||b;s(a[h].imports,b);q(b,a[h].cssText.replace(c,d))}}function t(){for(var a,b=e.getElementsByTagName("*"),c,d,h=new RegExp("^"+m+"$","i"),k=-1;++k<b.length;)if((a=b[k])&&(d=a.nodeName.match(h))){c=new RegExp("^\\s*<"+d+"(.*)\\/"+
d+">\\s*$","i");i.innerHTML=a.outerHTML.replace(/\r|\n/g," ").replace(c,a.currentStyle.display=="block"?"<div$1/div>":"<span$1/span>");c=i.childNodes[0];c.className+=" iepp_"+d;c=f[f.length]=[a,c];a.parentNode.replaceChild(c[1],c[0])}s(e.styleSheets,"all")}function u(){for(var a=-1,b;++a<f.length;)f[a][1].parentNode.replaceChild(f[a][0],f[a][1]);for(b in g)r[l].removeChild(g[b]);g={};f=[]}for(var m="abbr article aside audio canvas command datalist details figure figcaption footer header hgroup mark meter nav output progress section summary time video".replace(/ /g,
"|"),n=m.split("|"),r=e.documentElement,i=e.createDocumentFragment(),g={},f=[],o=-1,l="firstChild",j="createElement";++o<n.length;){e[j](n[o]);i[j](n[o])}i=i.appendChild(e[j]("div"));p.attachEvent("onbeforeprint",t);p.attachEvent("onafterprint",u)})(this,document)@end@*/;
/*
  Adapt.js licensed under GPL and MIT.

  Read more here: http://adapt.960.gs
*/

// Closure.
(function(w, d, config, undefined) {
  // If no config, exit.
  if (!config) {
    return;
  }

  // Empty vars to use later.
  var url, url_old, timer;

  // Alias config values.
  var callback = typeof config.callback === 'function' ? config.callback : undefined;
  var path = config.path ? config.path : '';
  var range = config.range;
  var range_len = range.length;

  // Create empty link tag:
  // <link rel="stylesheet" />
  var css = d.createElement('link');
  css.rel = 'stylesheet';

  // Called from within adapt().
  function change(i, width) {
    // Set the URL.
    css.href = url;
    url_old = url;

    // Call callback, if defined.
    callback && callback(i, width);
  }

  // Adapt to width.
  function adapt() {
    // This clearInterval is for IE.
    // Really it belongs in react(),
    // but doesn't do any harm here.
    clearInterval(timer);

    // Parse browser width.
    var width = w.innerWidth || d.documentElement.clientWidth || d.body.clientWidth || 0;

    // While loop vars.
    var arr, arr_0, val_1, val_2, is_range, file;

    // How many ranges?
    var i = range_len;
    var last = range_len - 1;

    while (i--) {
      // Turn string into array.
      arr = range[i].split('=');

      // Width is to the left of "=".
      arr_0 = arr[0];

      // File name is to the right of "=".
      // Presuppoes a file with no spaces.
      // If no file specified, assign [i].
      file = arr[1] ? arr[1].replace(/\s/g, '') : i;

      // Assume min/max if "to" isn't present.
      is_range = arr_0.match('to');

      // If it's a range, split left/right sides of "to",
      // and then convert each one into numerical values.
      // If it's not a range, turn maximum into a number.
      val_1 = is_range ? parseInt(arr_0.split('to')[0], 10) : parseInt(arr_0, 10);
      val_2 = is_range ? parseInt(arr_0.split('to')[1], 10) : undefined;

      // Check for maxiumum or range.
      if ((!val_2 && i === last && width > val_1) || (width > val_1 && width <= val_2)) {
        // Built full URL to CSS file.
        url = path + file;
        break;
      }
      else {
        // Blank if no conditions met.
        url = '';
      }
    }

    // Was it created yet?
    if (!url_old) {
      // Apply changes.
      change(i, width);

      // Add the CSS, only if path is defined.
      // Use faster document.head if possible.
      path && (d.head || d.getElementsByTagName('head')[0]).appendChild(css);
    }
    else if (url_old !== url) {
      // Apply changes.
      change(i, width);
    }
  }

  // Fire off once.
  adapt();

  // Slight delay.
  function react() {
    // Clear interval as window resize fires,
    // so that it only calls adapt() when the
    // user has finished resizing the window.
    clearInterval(timer);
    timer = setInterval(adapt, 100);
  }

  // Do we want to watch for
  // resize and device tilt?
  if (config.dynamic) {
    // Event listener for window resize,
    // also triggered by phone rotation.
    if (w.addEventListener) {
      // Good browsers.
      w.addEventListener('resize', react, false);
    }
    else if (w.attachEvent) {
      // Legacy IE support.
      w.attachEvent('onresize', react);
    }
    else {
      // Old-school fallback.
      w.onresize = react;
    }
  }

// Pass in window, document, config, undefined.
})(this, this.document, ADAPT_CONFIG);;
/*
  Formalize - version 1.1

  Note: This file depends on the jQuery library.
*/

// Module pattern:
// http://yuiblog.com/blog/2007/06/12/module-pattern
var FORMALIZE = (function($, window, document, undefined) {
  // Private constants.
  var PLACEHOLDER_SUPPORTED = 'placeholder' in document.createElement('input');
  var AUTOFOCUS_SUPPORTED = 'autofocus' in document.createElement('input');
  var IE6 = !!($.browser.msie && parseInt($.browser.version, 10) === 6);
  var IE7 = !!($.browser.msie && parseInt($.browser.version, 10) === 7);

  // Expose innards of FORMALIZE.
  return {
    // FORMALIZE.go
    go: function() {
      for (var i in FORMALIZE.init) {
        FORMALIZE.init[i]();
      }
    },
    // FORMALIZE.init
    init: {
      // FORMALIZE.init.full_input_size
      full_input_size: function() {
        if (!IE7 || !$('textarea, input.input_full').length) {
          return;
        }

        // This fixes width: 100% on <textarea> and class="input_full".
        // It ensures that form elements don't go wider than container.
        $('textarea, input.input_full').wrap('<span class="input_full_wrap"></span>');
      },
      // FORMALIZE.init.ie6_skin_inputs
      ie6_skin_inputs: function() {
        // Test for Internet Explorer 6.
        if (!IE6 || !$('input, select, textarea').length) {
          // Exit if the browser is not IE6,
          // or if no form elements exist.
          return;
        }

        // For <input type="submit" />, etc.
        var button_regex = /button|submit|reset/;

        // For <input type="text" />, etc.
        var type_regex = /date|datetime|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/;

        $('input').each(function() {
          var el = $(this);

          // Is it a button?
          if (this.getAttribute('type').match(button_regex)) {
            el.addClass('ie6_button');

            /* Is it disabled? */
            if (this.disabled) {
              el.addClass('ie6_button_disabled');
            }
          }
          // Or is it a textual input?
          else if (this.getAttribute('type').match(type_regex)) {
            el.addClass('ie6_input');

            /* Is it disabled? */
            if (this.disabled) {
              el.addClass('ie6_input_disabled');
            }
          }
        });

        $('textarea, select').each(function() {
          /* Is it disabled? */
          if (this.disabled) {
            $(this).addClass('ie6_input_disabled');
          }
        });
      },
      // FORMALIZE.init.autofocus
      autofocus: function() {
        if (AUTOFOCUS_SUPPORTED || !$(':input[autofocus]').length) {
          return;
        }

        $(':input[autofocus]:visible:first').focus();
      },
      // FORMALIZE.init.placeholder
      placeholder: function() {
        if (PLACEHOLDER_SUPPORTED || !$(':input[placeholder]').length) {
          // Exit if placeholder is supported natively,
          // or if page does not have any placeholder.
          return;
        }

        FORMALIZE.misc.add_placeholder();

        $(':input[placeholder]').each(function() {
          var el = $(this);
          var text = el.attr('placeholder');

          el.focus(function() {
            if (el.val() === text) {
              el.val('').removeClass('placeholder_text');
            }
          }).blur(function() {
            FORMALIZE.misc.add_placeholder();
          });

          // Prevent <form> from accidentally
          // submitting the placeholder text.
          el.closest('form').submit(function() {
            if (el.val() === text) {
              el.val('').removeClass('placeholder_text');
            }
          }).bind('reset', function() {
            setTimeout(FORMALIZE.misc.add_placeholder, 50);
          });
        });
      }
    },
    // FORMALIZE.misc
    misc: {
      // FORMALIZE.misc.add_placeholder
      add_placeholder: function() {
        if (PLACEHOLDER_SUPPORTED || !$(':input[placeholder]').length) {
          // Exit if placeholder is supported natively,
          // or if page does not have any placeholder.
          return;
        }

        $(':input[placeholder]').each(function() {
          var el = $(this);
          var text = el.attr('placeholder');

          if (!el.val() || el.val() === text) {
            el.val(text).addClass('placeholder_text');
          }
        });
      }
    }
  };
// Alias jQuery, window, document.
})(jQuery, this, this.document);

// Automatically calls all functions in FORMALIZE.init
jQuery(document).ready(function() {
  FORMALIZE.go();
});;
// $Id$
(function ($) {

/**
 * Toggles the collapsible region.
 */
Drupal.behaviors.skyAdminToggle = {
  attach: function (context, settings) {
    $('.collapsible-toggle a, context').click(function() {
      $('#section-collapsible').toggleClass('toggle-active').find('.region-collapsible').slideToggle('fast');
      return false;
    });
  }
	
}

/**
 * CSS Help for IE.
 * - Adds even odd striping and containers for images in posts.
 * - Adds a .first-child class to the first paragraph in each wrapper.
 * - Adds a prompt containing the link to a comment for the permalink.
 */
Drupal.behaviors.skyPosts = {
  attach: function (context, settings) {
    // Detects IE6-8.
    if (!jQuery.support.leadingWhitespace) {
      $('.content p:first-child').addClass('first-child');
      $('article .content img, context').parent(':not(.field-item, .user-picture)').each(function(index) {
        var stripe = (index/2) ? 'even' : 'odd';
        $(this).wrap('<div class="content-image-' + stripe  + '"></div>');
      });
    }
    // Comment link copy promt.
    $("header span a.permalink").click( function() {
      prompt('Link to this comment:', this.href);
      return false;
    });
  }
}



})(jQuery);
;
