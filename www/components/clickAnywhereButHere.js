/**
 * Created by vicky on 2015/8/16.
 */
(function () {
  'use strict';

  angular
      .module('nuclearApp')
      .directive('clickAnywhereButHere',  clickAnywhereButHere);

  /** @ngInject */
  function clickAnywhereButHere($document, $parse) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    /** @ngInject */

    function link(scope, element, attr, ctrl) {

      var handler = function(event) {
        if (!element[0].contains(event.target)) {
          scope.$apply(attr.clickAnywhereButHere)
        }
      };

      $document.on('click', handler);
      scope.$on('$destroy', function() {
        $document.off('click', handler);
      });


    }

  }

})();