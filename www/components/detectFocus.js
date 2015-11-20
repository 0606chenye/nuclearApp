/**
 * Created by vicky on 2015/8/18.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp')
      .directive('detectFocus',  detectFocus);

  /** @ngInject */
  function detectFocus() {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    /** @ngInject */

    function link(scope, elem, attrs) {

      elem.on("focus", function() {
        console.log(attrs.name + " has focus!");
      });

      elem.on("blur", function() {
        console.log(attrs.name + " lost focus");
      });

    }

  }

})();