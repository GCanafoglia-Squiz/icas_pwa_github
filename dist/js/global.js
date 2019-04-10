/*global jQuery*/
/**
 * icas-pwa
 * Global JS
 *
 * version: 0.0.1
 * file:    global.js
 * author:  Squiz Australia
 * change log:
 *     Wed Apr 10 2019 14:04:44 GMT+0100 (BST) - First revision
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

// This part in Matrix Start
//
// var user = 431889;
// let actualArticles = [];
// let toSaveArticles = [];
//
// This part in Matrix End

$(document).ready(function () {
  if ($('.main_article').length > 0) {

    getArticles(user);

    $('.socialicons .button').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      if ($this.hasClass('active')) {
        var actualArticle = $this.attr('data-articleid');
        removeFromRecord(user, actualArticle, $this);
      } else {
        var _actualArticle = $this.attr('data-articleid') + ';';
        addToRecord(user, _actualArticle, $this);
      }
    });
  }
});
//remove articleId from metadata
function removeFromRecord(assetId, articleId, button) {
  var actualArticlesString = void 0;
  js_api.acquireLock({
    "asset_id": assetId,
    "dependants_only": 0,
    "force_acquire": true,
    "dataCallback": remArticleMetadata
  });
  function remArticleMetadata(object) {
    console.log('remove metadata. object:');
    console.log(object);
    if (object[0]["warning"] || object["errorCode"] == "permissionError") {
      console.log('An error has occurred, maybe you are offline. please try again later.');
    } else {
      js_api.getMetadata({
        "asset_id": assetId,
        "dataCallback": storeToArrayToRemove
      });
    }
  }
  function storeToArrayToRemove(object) {
    $('.main_article').attr('data-articlelist', object["Saved.Record"]);
    actualArticles = object["Saved.Record"].split(';');
    if (actualArticles.indexOf(articleId) != -1) {
      console.log('is in');
      for (var i in actualArticles) {
        if (actualArticles[i] == articleId) {
          actualArticles.splice(i, 1);
          break;
        }
      }
      actualArticlesString = actualArticles.join(';');
      js_api.setMetadata({
        "asset_id": assetId,
        "field_id": 451003,
        "field_val": actualArticlesString,
        "dataCallback": function dataCallback() {
          releaseLockListArticle(assetId);
        }
      });
    }
  }
  function releaseLockListArticle(assetId) {
    js_api.releaseLock({
      "asset_id": assetId,
      "dataCallback": function dataCallback() {
        setNonActive(button);
      }
    });
  }
  function setNonActive(button) {
    $('.main_article').attr('data-articlelist', actualArticlesString);
    button.removeClass('active').html('Add to Learning Record');
  }
}

//add articleId to metadata
function addToRecord(assetId, articleId, button) {
  js_api.acquireLock({
    "asset_id": assetId,
    "dependants_only": 0,
    "force_acquire": true,
    "dataCallback": setArticleMetadata
  });
  function setArticleMetadata(object) {
    console.log('seta metadata. object:');
    console.log(object);
    if (object[0]["warning"] || object["errorCode"] == "permissionError") {
      console.log('An error has occurred, maybe you are offline. please try again later.');
    } else {
      var alreadysaved = $('.main_article').attr('data-articlelist');
      toSaveArticles = alreadysaved + articleId;
      $('.main_article').attr('data-articlelist', toSaveArticles);
      console.log(toSaveArticles);
      js_api.setMetadata({
        "asset_id": assetId,
        "field_id": 451003,
        "field_val": toSaveArticles,
        "dataCallback": function dataCallback() {
          releaseLockArticle(assetId);
        }
      });
    }
  }
  function releaseLockArticle(assetId) {
    js_api.releaseLock({
      "asset_id": assetId,
      "dataCallback": function dataCallback() {
        setActive(button);
      }
    });
  }
  function setActive(button) {
    button.addClass('active').html('Added to Learning Record');
  }
}

//get metadata and apply active class accordingly
function getArticles(assetId) {
  js_api.getMetadata({
    "asset_id": assetId,
    "dataCallback": storeToArray
  });
  function storeToArray(object) {
    if (object["Saved.Record"]) {
      //   console.log('article before split: ' + object["Saved.Record"]);
      $('.main_article').attr('data-articlelist', object["Saved.Record"]);
      actualArticles = object["Saved.Record"].split(';');
      //   console.log('article after split: ' + actualArticles);
      $('.socialicons .button').each(function () {
        var $this = $(this);
        var articleid = $this.attr('data-articleid').toString();
        if (actualArticles.indexOf(articleid) != -1) {
          $this.addClass('active').html('Added to Learning Record');
        }
      });
    }
  }
}
$(document).ready(function () {
  $('.menutrigger').on('click', function () {
    $('.slide_in_menu').toggleClass('slide_in_menu_open');
  });
});
// var isMobile = {
//   Android: function() {
//     return navigator.userAgent.match(/Android/i);
//   },
//   BlackBerry: function() {
//     return navigator.userAgent.match(/BlackBerry/i);
//   },
//   iOS: function() {
//     return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//   },
//   Opera: function() {
//     return navigator.userAgent.match(/Opera Mini/i);
//   },
//   Windows: function() {
//     return navigator.userAgent.match(/IEMobile/i);
//   },
//   any: function() {
//     return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
//   }
// };
var isMobile = {
  iOS: function iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  }
};

$(document).ready(function () {
  if ($('.ios_overlay').length > 0) {
    if (isMobile.iOS()) {
      $('.ios_overlay').css({ 'visibility': 'visible', 'opacity': '1' });
    }
    $('.ios_overlay').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      setIos(user, $this);
      // $this.css({'visibility': 'hidden', 'opacity': '0'});
    });
  }
});

function setIos(assetId, overlay) {
  js_api.acquireLock({
    "asset_id": assetId,
    "dependants_only": 0,
    "force_acquire": true,
    "dataCallback": setAssetMetadata
  });
  function setAssetMetadata(object) {
    console.log('seta metadata. object:');
    console.log(object);
    if (object[0]["warning"] || object["errorCode"] == "permissionError") {
      console.log('An error has occurred, maybe you are offline. please try again later.');
    } else {
      js_api.setMetadata({
        "asset_id": assetId,
        "field_id": 453599,
        "field_val": no,
        "dataCallback": function dataCallback() {
          releaseLock(assetId);
        }
      });
    }
  }
  function releaseLock(assetId) {
    js_api.releaseLock({
      "asset_id": assetId,
      "dataCallback": removeOverlay
    });
  }
  function removeOverlay() {
    overlay.css({ 'visibility': 'hidden', 'opacity': '0' });
  }
}
$(document).ready(function () {
  $('.articles_list--element .rmv_wrapper').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var actualArticle = $this.attr('data-articleid');
    console.log('actual article = ' + actualArticle);
    var button = $this.parents('li');
    console.log('actual button = ');
    console.log(button);
    removeButton(user, actualArticle, button);
  });
});

function removeButton(assetId, articleId, button) {
  var actualArticlesString = void 0;
  js_api.acquireLock({
    "asset_id": assetId,
    "dependants_only": 0,
    "force_acquire": true,
    "dataCallback": remArticleMetadata
  });
  function remArticleMetadata(object) {
    console.log('remove metadata. object:');
    console.log(object);
    if (object[0]["warning"] || object["errorCode"] == "permissionError") {
      console.log('An error has occurred, maybe you are offline. please try again later.');
    } else {
      js_api.getMetadata({
        "asset_id": assetId,
        "dataCallback": storeToArrayToRemove
      });
    }
  }
  function storeToArrayToRemove(object) {
    $('.record_list').attr('data-articlelist', object["Saved.Record"]);
    actualArticles = object["Saved.Record"].split(';');
    if (actualArticles.indexOf(articleId) != -1) {
      console.log('is in');
      for (var i in actualArticles) {
        if (actualArticles[i] == articleId) {
          actualArticles.splice(i, 1);
          break;
        }
      }
      actualArticlesString = actualArticles.join(';');
      js_api.setMetadata({
        "asset_id": assetId,
        "field_id": 451003,
        "field_val": actualArticlesString,
        "dataCallback": function dataCallback() {
          releaseLockListArticle(assetId);
        }
      });
    }
  }
  function releaseLockListArticle(assetId) {
    js_api.releaseLock({
      "asset_id": assetId,
      "dataCallback": function dataCallback() {
        setNonActive(button);
      }
    });
  }
  function setNonActive(button) {
    $('.record_list').attr('data-articlelist', actualArticlesString);
    button.remove();
  }
}
window.addEventListener('offline', function (e) {
  $('.app_area').css('margin-top', '0');
  $('.sw_message').css('opacity', '1');
});

window.addEventListener('online', function (e) {
  $('.app_area').css('margin-top', '-68px');
  $('.sw_message').css('opacity', '0');
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
    $('.nextButton a').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      var destination = $this.attr('href');
      $('ul.topics-list .topics-list__item').each(function () {
        if ($(this).hasClass('active')) {
          toAdd.push($(this).data('subscription'));
        }
      });
      setCategories(user, destination);
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
    console.log('seta metadata. object:');
    console.log(object);
    if ( /* object[0]["warning"] || */object["errorCode"] == "permissionError") {
      console.log('An error has occurred, maybe you are offline. please try again later.');
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
