/**
 * @file
 * Drupal WxT Bootstrap object.
 */

/**
 * All Drupal cch_wxt searchtheconsumerhub JavaScript APIs are contained in this namespace.
 *
 * @namespace
 */
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.searchtheconsumerhub = {
    attach: function (context, settings) {
      if (context == document) {
        SearchtheconsumerhubBlock.init();
      }
    }
  }
  Drupal.searchtheconsumerhub = {
    settings: drupalSettings.searchtheconsumerhub || {},
  };

  /**
   * Returns the version of WxT being used.
   *
   * @return {string}
   *   The version of WxT being used.
   */
  Drupal.searchtheconsumerhub.version = 'Cch_wxt searchtheconsumerhub block v1.0';

  console.log(Drupal.searchtheconsumerhub.version);

})(window.jQuery, window.Drupal, window.drupalSettings);


var SearchtheconsumerhubBlock = function() {
  var initialized = false;   // Flag to indicate that this class has been initialized
  var lang = 'en';           // Will be 'en' or 'fr' regardless of how the url segment is formed (currently eng or fra)
  var mouse = {x:0, y:0};    // Tracks the mouse position
  var page_type = 'content';

  /**
   * Initialization
   */
  function init() {
    if (initialized) {
      return;
    }

    // Get the current UI language
    $ = jQuery;

    SearchtheconsumerhubBlock.lang = $('html').attr('lang');

    //Determine the page type
    if ($('body').hasClass('path-search')) {
      SearchtheconsumerhubBlock.page_type = 'search'; // Search page.
    }
    else if ($('body').hasClass('path-admin')) {
      SearchtheconsumerhubBlock.page_type = 'admin'; // Other admin page.
    }
    var isIE = $('body').hasClass('isIE');
    if (!isIE/* && SearchtheconsumerhubBlock.lang == 'en'*/) {
      let searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('keys')) {
        var searchKeys = searchParams.get('keys');
        $('#wxt-search-block-form input').val(searchKeys);
      }
    } else {
      console.log('IE web browser is not fully supported, search keys not added to the search form.');
    }

    initialized = true;
  }


  /**
   * Expose functions and variables
   */
  return {
    init: init,
    lang: lang,
    page_type: page_type,
  }
}();

