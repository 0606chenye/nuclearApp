/**
 * Created by vicky on 2015/10/18.
 */


(function () {
  'use strict';

  angular
      .module('nuclearApp')
      .directive('hideTabs',  hideTabs);

  /** @ngInject */
  function hideTabs($rootScope) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    /** @ngInject */
    function link(scope, element, attributes) {
      scope.$watch(attributes.hideTabs, function(value){
        $rootScope.hideTabs = value;
      });

      scope.$on('$destroy', function() {
        $rootScope.hideTabs = false;
      });
    }

  }

})();
