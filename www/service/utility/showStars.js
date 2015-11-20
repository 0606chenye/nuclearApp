/**
 * Created by vicky on 2015/8/15.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp.services')
      .factory('ShowStars', ShowStars);

  function ShowStars() {

    return {
      getCompleteStarNumber: function (num) {
        return new Array(Math.floor(num));
      },
      haveHalfStar: function (num) {
        return num - Math.floor(num) > 0;
      }
    }
  }
})();