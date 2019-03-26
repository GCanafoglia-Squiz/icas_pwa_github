/*global jQuery*/
/**
 * icas-pwa
 * Global JS
 *
 * version: 0.0.1
 * file:    global.js
 * author:  Squiz Australia
 * change log:
 *     Tue Mar 26 2019 14:37:51 GMT+0000 (GMT) - First revision
 */

/*
 * Table of Contents
 *
 * - Global
 * - Modules

 */
'use strict';
/*
--------------------
Global
--------------------
*/
//  Declare JS Enabled.

$('body').removeClass('no-js').addClass('js-enabled');

/*
--------------------
Modules
--------------------
*/

$(document).ready(function () {
  $('.menutrigger').on('click', function () {
    $('.slide_in_menu').toggleClass('slide_in_menu_open');
  });
});
// this part is in Matrix start
// this part will be in the pain layout of the page
//
// var options = new Array();
// options['key'] = '9400745924';
// var js_api = new Squiz_Matrix_API(options);
// var user = 448785 ; //user ID
// var arrayCategories = [];
// var toAdd = [];
//
//
// this part is in Matrix end


// const arrayCategories = [111111, 333333, 444444, 777777, 181818, 212121];
// const toAdd = [];

$(document).ready(function () {
  if ($('.topics').length > 0) {

    //apply active class to subscribed categories
    getCategories(user);

    // add/remove category on Click
    $('ul.topics-list .topics-list__item').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      $this.toggleClass('active');
    });

    //submit selections
    $('.nextButton p').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      var destination = $this.data('destinationurl');
      $('ul.topics-list .topics-list__item').each(function () {
        if ($(this).hasClass('active')) {
          // console.log($(this).data('subscription'));
          toAdd.push($(this).data('subscription'));
        }
      });
      // console.log('end toAdd ' + toAdd);
      setCategories(user, destination);

      // window.location.href = destination;
    });
  }
});

//get metadata and apply active class accordingly
function getCategories(assetId) {
  js_api.getMetadata({
    "asset_id": assetId,
    "dataCallback": storeToArray
  });
  function storeToArray(object) {
    if (object["Selected.Topics"]) {
      arrayCategories = object["Selected.Topics"].split('; ');
      $('ul.topics-list .topics-list__item').each(function () {
        var $this = $(this);
        var category = $this.data('subscription').toString();
        if (arrayCategories.indexOf(category) != -1) {
          $this.addClass('active');
        }
      });
    }
  }
}

//acquire lock, save metadata, relase lock
function setCategories(assetId, urlDestination) {
  js_api.acquireLock({
    "asset_id": assetId,
    "dependants_only": 0,
    "force_acquire": true,
    "dataCallback": setAssetMetadata
  });
  function setAssetMetadata(object) {
    console.log(object);
    if (object[0]["warning"]) {
      errorMessage();
    } else {
      var setStringCategories = toAdd.join('; ');
      js_api.setMetadata({
        "asset_id": assetId,
        "field_id": 448763,
        "field_val": setStringCategories,
        "dataCallback": function dataCallback() {
          releaseLock(assetId);
        }
      });
    }
  }
  function releaseLock(assetId) {
    js_api.releaseLock({
      "asset_id": assetId,
      "dataCallback": redirect
    });
  }
  function redirect() {
    window.location.href = urlDestination;
  }
}
//# sourceMappingURL=global.js.map
